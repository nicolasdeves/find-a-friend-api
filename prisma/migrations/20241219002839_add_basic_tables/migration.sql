-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "org_id" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
