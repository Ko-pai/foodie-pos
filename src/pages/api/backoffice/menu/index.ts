import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let method = req.method;
  if (method === "GET") {
    return res.status(200).send("OK GET");
  } else if (method === "POST") {
    const { name, price, menuCategoryId , assetUrl } = req.body;
    const isValid = name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(400).send("Bad request");

    const findMenu = await prisma.menu.findFirst({ where: { name: name } });

    

    const menu = await prisma.menu.create({ data: { name, price , assetUrl  } });

    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryId.map((item: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: item },
        })
      )
    );

    return res.status(200).json({ menu, menuCategoryMenu });
  } else if (method === "PUT") {
    const { id, name, price, isAvailable, menuCategoryIds, locationId } =
      req.body;

    const exist = await prisma.menu.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");

    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });

    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenu.create({
          data: { locationId, menuId: id },
        });
      } else {
        const item = await prisma.disableLocationMenu.findFirst({
          where: { menuId: id, locationId },
        });
        item &&
          (await prisma.disableLocationMenu.delete({ where: { id: item.id } }));
      }
    }

    if (menuCategoryIds) {
      const menuCategoriesMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });
      // toRemove
      const toRemove = menuCategoriesMenus.filter(
        (d) => !menuCategoryIds.includes(d.menuCategoryId)
      );

      if (toRemove.length) {
        await prisma.$transaction(
          toRemove.map((item) =>
            prisma.menuCategoryMenu.delete({ where: { id: item.id } })
          )
        );
      }

      // toAdd
      const toAdd = menuCategoryIds.filter(
        (item: number) =>
          !menuCategoriesMenus.find((d) => d.menuCategoryId === item)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((item: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuId: id, menuCategoryId: item },
            })
          )
        );
      }
    }
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const locations = await prisma.location.findMany({
      where: { companyId: location?.companyId },
    });

    const locationIds = locations.map((item) => item.id);

    const disableLocationMenu = await prisma.disableLocationMenu.findMany({
      where: { locationId: { in: locationIds } },
    });
    
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuId: id },
    });

    return res
      .status(200)
      .json({ menu, disableLocationMenu, menuCategoryMenu });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const findMenu = await prisma.menu.findFirst({ where: { id: id } });

    if (findMenu) {
      const deleteMenu = await prisma.menu.update({
        data: {
          isArchived: true,
        },
        where: { id: id },
      });
      return res.send("Delete menu");
    } else {
      return res.send("Unsuccessful delete");
    }
  }

  return res.status(405).send("Method Not Allowed");
}

/* 
if (findMenu) {
      if (findMenu.isArchived === true) {
        const updateMenuChangeArchived = await prisma.menu.update({
          data: { isArchived: false },
          where: {
            id: findMenu.id,
          },
        });
        return res.send("Update Success");
      } else {
        return res.status(400).json({ error: "Menu is already exists" });
      }
    }*/