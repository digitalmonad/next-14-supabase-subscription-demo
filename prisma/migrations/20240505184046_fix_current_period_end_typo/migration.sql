/*
  Warnings:

  - You are about to drop the column `cuerrentPeriodEnd` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `currentPeriodEnd` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "cuerrentPeriodEnd",
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3) NOT NULL;
