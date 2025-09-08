-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expertise" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phones" TEXT[],
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "genderId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '/getImage/p24/search-women/noimage.png?size=150',
    "expertiseId" INTEGER NOT NULL,
    "medicalSystemNumber" INTEGER NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activeConsultNumber" INTEGER,
    "firstAvailableAppointment" TIMESTAMP(3) NOT NULL,
    "aboutMe" TEXT,
    "onlineVisitPrice" INTEGER,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gender_label_key" ON "Gender"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Expertise_label_key" ON "Expertise"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_medicalSystemNumber_key" ON "Doctor"("medicalSystemNumber");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "Expertise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
