-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "user.username_unique" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_userId_title_un_key" ON "subject"("user_id", "title");

-- AddForeignKey
ALTER TABLE "subject" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repetition" ADD FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repetition" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
