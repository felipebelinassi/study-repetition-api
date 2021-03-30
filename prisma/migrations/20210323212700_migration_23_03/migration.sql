/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[user_id,title]` on the table `subject`. If there are existing duplicate values, the migration will fail.
  - Added the required column `user_id` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_userId_title_un_key" ON "subject"("user_id", "title");

-- AddForeignKey
ALTER TABLE "subject" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
