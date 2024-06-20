import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get company");
  } else if (method === "POST") {
    return res.send("Get company");
  } else if (method === "PUT") {
    const { id, name, street, city, township } = req.body;

    const isValid = name && street && city && township;

    if (!isValid) return res.status(400).send("Bad request!");

    const exist = await prisma.company.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad request!");
    const company = await prisma.company.update({
      data: { name, street, city, township },
      where: {
        id,
      },
    });

    return res.status(200).json({ company });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);

    const findLocation = await prisma.location.findFirst({ where: { id: id } });
    if (!findLocation) return res.status(400).send("Bad Request!");

    const deleteLocation = await prisma.location.update({
      data: { isArchived: true },
      where: {
        id: id,
      },
    });
    return res.send("Delete location");
  }

  return res.status(405).send("Method Not Allowed");
}
