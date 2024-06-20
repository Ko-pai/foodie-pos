import { qrCodeUploadImage } from "@/utils/assetUpload";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get table");
  } else if (method === "POST") {
    const { name, locationId } = req.body;

    const isValid = name && locationId;
    if (!isValid) {
      return res.status(400).send("Bad request!");
    }

    let table = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });

    const assetUrl = await qrCodeUploadImage(table.id);

    table = await prisma.table.update({
      data: { assetUrl },
      where: { id: table.id },
    });

    return res.status(200).json({ table });
  } else if (method === "PUT") {
    const { id, name, locationId } = req.body;

    const exist = await prisma.table.findFirst({ where: { id } });

    if (!exist) {
      return res.status(400).send("Bad request!");
    }

    const table = await prisma.table.update({
      data: { name, locationId },
      where: { id },
    });

    return res.status(200).json({ table });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);

    const findTable = await prisma.table.findFirst({ where: { id } });

    if (!findTable) {
      return res.status(400).send("Bad request!");
    }

    await prisma.table.update({ data: { isArchived: true }, where: { id } });

    return res.send("Delete table");
  }

  return res.status(405).send("Method Not Allowed");
}

/*
 const findTable = await prisma.table.findMany({ where: { name } });

    if (findTable) {
      const test = findTable
        .filter((d) => d.name === name && d.isArchived === true)
        .find((d) => d.locationId === locationId);

      if (test) {
        const table = await prisma.table.update({
          data: { isArchived: false },
          where: { id: test.id },
        });
        return res.status(200).json({ table });
      }
    } */
