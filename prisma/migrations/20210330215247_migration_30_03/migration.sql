/*
  Warnings:

  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_user_id_fkey";

-- DropTable
DROP TABLE "event";

-- CreateTable
CREATE TABLE "repetition" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "repetition" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repetition" ADD FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repetition" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
