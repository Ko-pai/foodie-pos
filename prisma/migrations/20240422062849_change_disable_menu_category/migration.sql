/*
  Warnings:

  - You are about to drop the column `menuCategoryId` on the `DisableLocationMenu` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `DisableLocationMenuCategory` table. All the data in the column will be lost.
  - Added the required column `menuId` to the `DisableLocationMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuCategoryId` to the `DisableLocationMenuCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DisableLocationMenu" DROP CONSTRAINT "DisableLocationMenu_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "DisableLocationMenuCategory" DROP CONSTRAINT "DisableLocationMenuCategory_menuId_fkey";

-- AlterTable
ALTER TABLE "DisableLocationMenu" DROP COLUMN "menuCategoryId",
ADD COLUMN     "menuId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DisableLocationMenuCategory" DROP COLUMN "menuId",
ADD COLUMN     "menuCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategory" ADD CONSTRAINT "DisableLocationMenuCategory_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenu" ADD CONSTRAINT "DisableLocationMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
