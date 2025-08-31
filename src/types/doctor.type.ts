import Prisma from "@prisma/client";

import { AddressType } from "@/types/address.type";

export type DoctorType = Omit<Prisma.Doctor, "aboutMe"> & {
  aboutMe: string | undefined;
  totalPeopleRate: number;
  averageRating: number;
  expertise: Prisma.Expertise;
  addresses: AddressType[];
};
