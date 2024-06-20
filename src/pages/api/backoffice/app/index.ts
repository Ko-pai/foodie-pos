import { qrCodeUploadImage } from "@/utils/assetUpload";
import { prisma } from "@/utils/prisma";
import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const { user } = session;
    const email = String(user?.email);
    const name = String(user?.name);

    const findEmail = await prisma.user.findFirst({ where: { email } });

    if (findEmail) {
      const companyId = findEmail.companyId;
      const company = await prisma.company.findFirst({
        where: { id: companyId },
      });

      const locations = await prisma.location.findMany({
        orderBy: [{ id: "asc" }],
        where: { companyId, isArchived: false },
      });
      const locationIds = locations.map((d) => d.id);

      const menuCategory = await prisma.menuCategory.findMany({
        orderBy: [{ id: "asc" }],
        where: { companyId: companyId, isArchived: false },
      });

      const menuCategoryId = menuCategory.map((d) => {
        return d.id;
      });

      const disableLocationMenuCategory =
        await prisma.disableLocationMenuCategory.findMany({
          where: { menuCategoryId: { in: menuCategoryId } },
        });

      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryId } },
      });

      const menuCategoryMenuIds = menuCategoryMenu.map((d) => {
        return d.menuId;
      });
      const menus = await prisma.menu.findMany({
        orderBy: [{ id: "asc" }],
        where: { id: { in: menuCategoryMenuIds }, isArchived: false },
      });
      const menuIds = menus.map((d) => d.id);
      const disableLocationMenu = await prisma.disableLocationMenu.findMany({
        where: { menuId: { in: menuIds } },
      });
      const table = await prisma.table.findMany({
        orderBy: [{ id: "asc" }],
        where: { locationId: { in: locationIds }, isArchived: false },
      });

      const menuAddOnCategories = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds } },
      });

      const addOnCategoryIds = menuAddOnCategories.map((d) => {
        return d.addOnCategoryId;
      });

      const addOnCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addOnCategoryIds }, isArchived: false },
      });

      const addon = await prisma.addon.findMany({
        orderBy: [{ id: "asc" }],
        where: { addonCategoryId: { in: addOnCategoryIds }, isArchived: false },
      });

      res.status(200).send({
        company,
        locations,
        menuCategory,
        addOnCategories,
        menus,
        table,
        menuAddOnCategories,
        addon,
        menuIds,
        menuCategoryMenu,
        disableLocationMenuCategory,
        disableLocationMenu,
      });
    } else {
      const newCompany = await prisma.company.create({
        data: {
          name: "Default Branch",
          street: "Default street",
          township: "Default Township",
          city: "Default City",
        },
      });
      const newUser = await prisma.user.create({
        data: { name, email, companyId: newCompany.id },
      });

      const newlocation = await prisma.location.create({
        data: {
          name: "Default Branch",
          city: "Default City",
          street: "Default Street",
          companyId: newCompany.id,
          township: "Default Township",
        },
      });

      let newTable = await prisma.table.create({
        data: {
          name: "Default Table 01",
          locationId: newlocation.id,
          assetUrl: "blablah",
        },
      });
      const assetUrl = await qrCodeUploadImage(newTable.id);
      newTable = await prisma.table.update({
        data: { assetUrl },
        where: { id: newTable.id },
      });

      const newMenuCategory = await prisma.menuCategory.create({
        data: {
          name: "Most Popular",
          companyId: newCompany.id,
        },
      });

      const newMenu = await prisma.menu.create({
        data: {
          name: "Default menu",
          price: 0,
        },
      });

      const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
        data: {
          menuId: newMenu.id,
          menuCategoryId: newMenuCategory.id,
        },
      });

      const newAddOnCategory = await prisma.addonCategory.create({
        data: {
          name: "Default addon",
        },
      });

      const newMenuAddOnCategory = await prisma.menuAddonCategory.create({
        data: {
          menuId: newMenu.id,
          addOnCategoryId: newAddOnCategory.id,
        },
      });

      const newAddOnData = [
        { name: "Addon 1", addonCategoryId: newAddOnCategory.id },
        { name: "Addon 2", addonCategoryId: newAddOnCategory.id },
        { name: "Addon 3", addonCategoryId: newAddOnCategory.id },
      ];

      const newAddon = await prisma.$transaction(
        newAddOnData.map((addon) => prisma.addon.create({ data: addon }))
      );

      res.status(200).json({
        company: newCompany,
        menu: [newMenu],
        table: [newTable],
        location: [newlocation],
        addon: [newAddon],
        addonCategory: [newAddOnCategory],
        menuAddonCategories: [newMenuAddOnCategory],
        menuCategoryMenus: [newMenuCategoryMenu],
        disableLocationMenus: [],
        disableLocationMenuCategories: [],
      });
    }
  } else {
    return res.status(401).send("Unauthorized");
  }

  /*
  let method = req.method;
  if (method === "GET") {
    const findMenu = await prisma.menu.findMany();
    const findMenuCategory = await prisma.menuCategory.findMany();

    return res.status(200).json({ findMenu, findMenuCategory });
  } else if (method === "POST") {
    return res.send("Post app");
  } else if (method === "PUT") {
    return res.send("Put app");
  } else if (method === "DELETE") {
    return res.send("Delete app");
  }

  return res.status(405).send("Method Not Allowed");
  */
}
