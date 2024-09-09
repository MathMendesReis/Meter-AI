-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "contentLength" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
