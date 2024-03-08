import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const documents = await prisma.document.findMany({
    where: {
      campaignId: Number(req.query.campaignId),
    },
  });

  console.log(documents);

  if (!documents)
    res
      .status(400)
      .json({ message: "There are no documents in this campaign!" });
  res.status(200).json(documents);
}
