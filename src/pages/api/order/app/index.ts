import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const { tableId } = req.query;

    const table = await prisma.table.findFirst({
      where: { id: Number(tableId) },
    });

    const location = await prisma.location.findFirst({
      where: { id: table?.locationId },
    });

    const company = await prisma.company.findFirst({
      where: { id: location?.companyId },
    });

    let menuCategory = await prisma.menuCategory.findMany({
      where: { companyId: company?.id, isArchived: false },
    });

    const menuCategoryId = menuCategory.map((d) => d.id);

    const disableMenuCategoryIds = (
      await prisma.disableLocationMenuCategory.findMany({
        where: {
          menuCategoryId: { in: menuCategoryId },
          locationId: location?.id,
        },
      })
    ).map((d) => d.menuCategoryId);

    menuCategory = menuCategory.filter(
      (d) => !disableMenuCategoryIds.includes(d.id)
    );

    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryId } },
    });

    const menuId = menuCategoryMenu.map((d) => d.menuId);

    const disableMenuIds = (
      await prisma.disableLocationMenu.findMany({
        where: { menuId: { in: menuId }, locationId: location?.id },
      })
    ).map((d) => d.menuId);

    const menus = (
      await prisma.menu.findMany({
        orderBy: [{ id: "asc" }],
        where: { id: { in: menuId }, isArchived: false },
      })
    ).filter((d) => !disableMenuIds.includes(d.id));

    const menuAddOnCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuId } },
    });

    const addonCategoriesIds = menuAddOnCategories.map(
      (d) => d.addOnCategoryId
    );

    const addOnCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoriesIds }, isArchived: false },
    });

    const addon = await prisma.addon.findMany({
      where: { addonCategoryId: { in: addonCategoriesIds }, isArchived: false },
    });

    const orders = await prisma.order.findMany({
      where: { tableId: table?.id },
    });
    

    

    return res.status(200).json({
      company,
      locations: [location],
      menuCategory,
      addOnCategories,
      menus,
      table,
      menuAddOnCategories,
      addon,
      menuCategoryMenu,
      tables: [table],
      disableLocationMenuCategories: [],
      disableLocationMenus: [],
      orders,
    });
  }
}
