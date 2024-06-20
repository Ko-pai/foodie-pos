import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get addon");
  } else if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && price !== undefined;

    if (!isValid) return res.status(400).send("Bad Request!");

    const addon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });

    return res.status(200).json({ addon });
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;

    const exist = await prisma.addon.findFirst({ where: { id } });
    if (!exist) {
      return res.status(400).send("Bad Request!");
    }

    const updateAddon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });

    return res.status(200).json({ updateAddon });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);

    const findAddon = await prisma.addon.findFirst({ where: { id } });

    if (findAddon) {
      await prisma.addon.update({ data: { isArchived: true }, where: { id } });

      return res.send("Delete addon");
    } else {
      return res.status(400).send("Bad Request!");
    }
  }

  return res.status(405).send("Method Not Allowed");
}
