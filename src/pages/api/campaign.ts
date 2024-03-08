import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });

  if (!campaign)
    res.status(400).json({ message: "This campaign does not exist!" });
  res.status(200).json(campaign);
}
