import type { ShortLink } from "@prisma/client";
import type { NextApiHandler } from "next";
import { prisma } from "../../../lib/db/client";

const handler: NextApiHandler<ShortLink> = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(400).end();
  }

  const shortLink = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!shortLink) {
    return res.status(404).end();
  }

  res.status(200).json(shortLink);
};

export default handler;
