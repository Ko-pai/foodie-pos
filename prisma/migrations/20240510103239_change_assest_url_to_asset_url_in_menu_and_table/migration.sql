/*
  Warnings:

  - You are about to drop the column `assestUrl` on the `Table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Table" DROP COLUMN "assestUrl",
ADD COLUMN     "assetUrl" TEXT;
