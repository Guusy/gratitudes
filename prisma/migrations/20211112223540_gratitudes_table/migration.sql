-- CreateTable
CREATE TABLE "Gratitude" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "item_1" TEXT NOT NULL,
    "item_2" TEXT,
    "item_3" TEXT,
    "item_4" TEXT,
    "item_5" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Gratitude_pkey" PRIMARY KEY ("id")
);
