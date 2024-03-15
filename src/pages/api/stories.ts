import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const stories = await prisma.story.findMany({
    where: {
      campaignId: Number(req.query.campaignId),
    },
  });

  if (!stories)
    res.status(400).json({ message: "There are no stories in this campaign!" });
  res.status(200).json(stories);
}
