import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get addon-category");
  } else if (method === "POST") {
    const { name, isRequired, menuIds } = req.body;

    const isValid = name && isRequired !== undefined;
    if (!isValid) {
      return res.status(400).send("Bad Request!");
    }

    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const exist = await prisma.addonCategory.findFirst({ where: { name } });

    const createMenuAddonCategories = await prisma.$transaction(
      menuIds.map((d: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: d, addOnCategoryId: Number(exist?.id) },
        })
      )
    );

    const menuAddOnCategories = await prisma.menuAddonCategory.findMany({
      where: { addOnCategoryId: exist?.id },
    });
    console.log(menuAddOnCategories);

    return res.status(200).json({ addonCategory, menuAddOnCategories });
  } else if (method === "PUT") {
    const { id, name, menuIds, companyId, isRequired } = req.body;

    const exist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");

    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });

    const findMenuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { addOnCategoryId: id },
    });

    // To Remove addon category
    const toRemove = findMenuAddonCategories.filter(
      (d) => !menuIds.includes(d.menuId)
    );
    console.log(toRemove);

    if (toRemove.length) {
      await prisma.menuAddonCategory.deleteMany({
        where: { id: { in: toRemove.map((d) => d.id) } },
      });
    }

    // To add menuAddonCategory
    const toAdd = menuIds.filter(
      (d: number) => !findMenuAddonCategories.find((item) => item.menuId === d)
    );
    if (toAdd.length) {
      await prisma.$transaction(
        toAdd.map((d: number) =>
          prisma.menuAddonCategory.create({
            data: { menuId: d, addOnCategoryId: id },
          })
        )
      );
    }
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId },
    });

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
    });

    const companyMenuId = menuCategoryMenus.map((item) => item.menuId);

    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: companyMenuId } },
    });

    return res.status(200).json({ menuAddonCategories, addonCategory });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);

    const findAddonCategory = await prisma.addonCategory.findFirst({
      where: { id },
    });

    if (!findAddonCategory) {
      return res.status(400).send("Bad request!");
    }

    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id: id },
    });
    return res.send("Delete addon-category");
  }

  return res.status(405).send("Method Not Allowed");
}
