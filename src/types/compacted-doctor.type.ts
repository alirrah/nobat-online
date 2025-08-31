import Prisma from "@prisma/client";

export type CompactedDoctorType = Omit<
  Prisma.Doctor,
  | "medicalSystemNumber"
  | "genderId"
  | "expertiseId"
  | "aboutMe"
  | "onlineVisitPrice"
  | "activeConsultNumber"
  | "createdAt"
  | "addresses"
> & {
  gender: string;
  expertise: string;
  averageRating: number;
  addresses: {
    location: string;
  }[];
};
