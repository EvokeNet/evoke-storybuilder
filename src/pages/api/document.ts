import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const document = await prisma.document.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });

  if (!document)
    res.status(400).json({ message: "This document does not exist!" });
  res.status(200).json(document);
}
