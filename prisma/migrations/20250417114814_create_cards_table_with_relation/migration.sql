-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "attackPoints" INTEGER NOT NULL,
    "defensePoints" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "collectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_name_key" ON "cards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cards_collectionId_key" ON "cards"("collectionId");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
