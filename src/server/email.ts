import sendgrid from "@sendgrid/mail";
import { stripIndents } from "common-tags";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function sendOrderSuccessCustomerEmail(to: string) {
  const text = stripIndents`
  Hey!

  You should have received an email from Stripe with all your payment and shipping information. I'll be preparing your print shortly and will send a follow up email with tracking numbers etc.

  If you have any questions, you can reply to this email and I can help where possible.

  Thank you again for your order, it means a lot!
  
  Cheers,
  Sam
`;

  await sendgrid.send({
    to,
    from: "accounts@samking.studio",
    subject: "Thank you for your print order!",
    text,
  });
}

export async function sendOrderSuccessStudioEmail(
  stripeId: string,
  project: string,
  tokenIds: number[]
) {
  const text = stripIndents`
  You have a new order: https://dashboard.stripe.com/payments/${stripeId}

  ${project}: ${tokenIds.map((id) => `#${id}`).join(", ")}
`;

  await sendgrid.send({
    to: "accounts@samking.studio",
    from: "accounts@samking.studio",
    subject: `Prints for ${project}: ${tokenIds
      .map((id) => `#${id}`)
      .join(", ")}`,
    text,
  });
}
