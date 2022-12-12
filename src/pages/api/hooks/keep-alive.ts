import { verifySignature } from "@upstash/qstash/nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

async function keepAlive(req: NextApiRequest, res: NextApiResponse) {
  await prisma.keepAlive.create({ data: {} });
  res.status(200).end();
}

export default verifySignature(keepAlive);

export const config = {
  api: {
    bodyParser: false,
  },
};
