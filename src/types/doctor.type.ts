import Prisma from "@prisma/client";

import { AddressType } from "@/types/address.type";

export type DoctorType = Prisma.Doctor & {
  totalPeopleRate: number;
  averageRating: number;
  expertise: Prisma.Expertise;
  addresses: AddressType[];
};
