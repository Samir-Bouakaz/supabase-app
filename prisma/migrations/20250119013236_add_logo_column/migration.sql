/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Etablissement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Etablissement" DROP COLUMN "logoUrl",
ADD COLUMN     "logo" BYTEA;
