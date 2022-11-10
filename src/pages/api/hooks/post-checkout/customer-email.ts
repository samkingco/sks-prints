import { verifySignature } from "@upstash/qstash/nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { sendDiscordMessage } from "../../../../server/discord";
import { sendOrderSuccessCustomerEmail } from "../../../../server/email";
import { type PostStripeMessage } from "../../stripe";

async function customerEmail(req: NextApiRequest, res: NextApiResponse) {
  const message = req.body as PostStripeMessage;

  if (message.customerEmail) {
    try {
      await sendOrderSuccessCustomerEmail(message.customerEmail);
    } catch (error) {
      console.error(error);
      await sendDiscordMessage(
        "UNKNOWN",
        `Error sending customer email\n\`\`\`${JSON.stringify(
          message,
          null,
          2
        )}\`\`\``
      );
    }
  }

  res.status(200).end();
}

export default verifySignature(customerEmail);

export const config = {
  api: {
    bodyParser: false,
  },
};
