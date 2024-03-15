import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const story = await prisma.story.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });

  if (!story) res.status(400).json({ message: "This story does not exist!" });
  res.status(200).json(story);
}
