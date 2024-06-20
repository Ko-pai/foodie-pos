import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get menu-category");
  } else if (method === "POST") {
    const { name, isAvaliable, companyId } = req.body;

    const isValid = name && companyId && isAvaliable !== undefined;
    if (!isValid) {
      return res.status(400).send("Bad Request");
    }

    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });

    return res.json({ menuCategory });
  } else if (method === "PUT") {
    const { id, locationId, isAvaliable, ...payload } = req.body;

    const menuCategory = await prisma.menuCategory.findFirst({ where: { id } });
    if (!menuCategory) {
      return res.status(400).send("Bad Request");
    }

    const updateMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });

    const exist = await prisma.disableLocationMenuCategory.findFirst({
      where: { locationId, menuCategoryId: id },
    });

    if (locationId && isAvaliable !== undefined) {
      if (isAvaliable === false) {
        await prisma.disableLocationMenuCategory.create({
          data: { locationId, menuCategoryId: id },
        });
      } else {
        const findDisable = await prisma.disableLocationMenuCategory.findFirst({
          where: { menuCategoryId: id, locationId },
        });

        findDisable &&
          (await prisma.disableLocationMenuCategory.delete({
            where: { id: exist?.id },
          }));
      }
    }
    const disabledLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany({
        where: { menuCategoryId: id },
      });

    return res
      .status(200)
      .json({ updateMenuCategory, disabledLocationMenuCategories });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const findMenuCategory = await prisma.menuCategory.findFirst({
      where: { id },
    });
    if (!findMenuCategory) {
      return res.status(400).send("Bad request!");
    }
    const deleteMenuCategory = await prisma.menuCategory.update({
      data: { isArchived: true },
      where: {
        id: id,
      },
    });
    return res.send("Delete menu-category");
  }

  return res.status(405).send("Method Not Allowed");
}
