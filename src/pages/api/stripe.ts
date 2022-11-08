import { Project } from "@prisma/client";
import Cors from "cors";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "../../server/db";
import { printClaimEmbed, sendDiscordMessage } from "../../server/discord";
import {
  sendOrderSuccessCustomerEmail,
  sendOrderSuccessStudioEmail,
} from "../../server/email";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

const cors = Cors({
  methods: ["POST", "HEAD"],
});

export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { method } = req;
  switch (method) {
    case "POST":
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"]!;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          buf.toString(),
          sig,
          process.env.STRIPE_WEBHOOK_SECRET || ""
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        // On error, log and return the error message.
        if (err! instanceof Error) console.log(err);
        console.error(`Error message: ${errorMessage}`);
        res.status(400).send(`Webhook Error: ${errorMessage}`);
        return;
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const email = session.customer_details.email as string;
        if (email) {
          await sendOrderSuccessCustomerEmail(email);
        }
      }

      // Cast event data to Stripe object and save in DB
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const address = paymentIntent.metadata.address as string;
        const project = paymentIntent.metadata.project as Project;
        const tokenIds = paymentIntent.metadata.tokenIds
          .split(",")
          .map((i) => parseInt(i, 10))
          .sort();

        // Add the orders and tokens to the db
        await prisma.order.create({
          data: {
            stripeId: paymentIntent.id,
            wallet: address,
            token: {
              createMany: {
                data: tokenIds.map((id) => ({ tokenId: id, project })),
              },
            },
          },
          include: {
            token: true,
          },
        });

        // Send order success email to studio email
        try {
          await sendOrderSuccessStudioEmail(
            paymentIntent.id,
            project,
            tokenIds
          );
        } catch (error) {
          console.error(error);
        }

        // Post to discord
        try {
          let ens = address;
          const ensRes = await fetch(
            `https://api.ensideas.com/ens/resolve/${address}`
          );

          if (ensRes.ok) {
            const ensJson = await ensRes.json();
            ens = ensJson.displayName;
          }

          for (const id of tokenIds) {
            await sendDiscordMessage(project, {
              embeds: [
                printClaimEmbed({
                  project: project,
                  tokenId: id,
                  claimedEns: ens,
                  claimedAddress: address,
                }),
              ],
            });
          }
        } catch (error) {
          console.error(error);
        }
      }

      // Return a response to acknowledge receipt of the event.
      return res.json({ received: true });

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
