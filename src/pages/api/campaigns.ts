import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const allCampaigns = await prisma.campaign.findMany();

  if (!allCampaigns)
    res.status(400).json({ message: "You didn't create a campaign yet!" });
  res.status(200).json(allCampaigns);
}
