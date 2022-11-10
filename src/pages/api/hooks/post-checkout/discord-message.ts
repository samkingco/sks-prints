import { verifySignature } from "@upstash/qstash/nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import {
  printClaimEmbed,
  sendDiscordMessage,
} from "../../../../server/discord";
import { PostStripeMessage } from "../../stripe";

async function discordMessage(req: NextApiRequest, res: NextApiResponse) {
  const message = req.body as PostStripeMessage;

  try {
    let ens = message.address;
    const ensRes = await fetch(
      `https://api.ensideas.com/ens/resolve/${message.address}`
    );

    if (ensRes.ok) {
      const ensJson = await ensRes.json();
      ens = ensJson.displayName;
    }

    for (const id of message.tokenIds) {
      await sendDiscordMessage(message.project, {
        embeds: [
          printClaimEmbed({
            project: message.project,
            tokenId: id,
            claimedEns: ens,
            claimedAddress: message.address,
          }),
        ],
      });
    }
  } catch (error) {
    console.error(error);
    await sendDiscordMessage(
      "UNKNOWN",
      `Error posting to prints channel\n\`\`\`${JSON.stringify(
        message,
        null,
        2
      )}\`\`\``
    );
  }

  res.status(200).end();
}

export default verifySignature(discordMessage);

export const config = {
  api: {
    bodyParser: false,
  },
};
