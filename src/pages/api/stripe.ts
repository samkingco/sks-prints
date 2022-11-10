import { Project } from "@prisma/client";
import { Client } from "@upstash/qstash";
import Cors from "cors";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "../../server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

const qstash = new Client({
  token: process.env.QSTASH_TOKEN || "",
});

const cors = Cors({
  methods: ["POST", "HEAD"],
});

export interface PostStripeMessage {
  customerEmail?: string;
  stripeId: string;
  address: string;
  project: Project;
  tokenIds: number[];
}

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

      const message: PostStripeMessage = {
        stripeId: "",
        address: "",
        project: "UNKNOWN",
        tokenIds: [],
      };

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        message.customerEmail = session.customer_details.email as string;
      }

      // Cast event data to Stripe object and save in DB
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        message.address = paymentIntent.metadata.address as string;
        message.project = paymentIntent.metadata.project as Project;
        message.tokenIds = paymentIntent.metadata.tokenIds
          .split(",")
          .map((i) => parseInt(i, 10))
          .sort();

        // Add the orders and tokens to the db
        await prisma.order.create({
          data: {
            stripeId: paymentIntent.id,
            wallet: message.address,
            token: {
              createMany: {
                data: message.tokenIds.map((id) => ({
                  tokenId: id,
                  project: message.project,
                })),
              },
            },
          },
          include: {
            token: true,
          },
        });
      }

      // Post message to upstash
      await qstash.publishJSON({
        topic: "sks-prints-stripe-success",
        body: message,
      });

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
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
