import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { CompactedDoctorType } from "@/types/compacted-doctor.type";

import { wrapWithTryCatch } from "@/utils/api.util";

export async function GET(
  request: Request,
): Promise<ApiResponseType<CompactedDoctorType[]>> {
  return wrapWithTryCatch(async () => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const where: Prisma.DoctorWhereInput = {};

    const gender = searchParams.get("gender");
    if (gender) {
      where.genderId = parseInt(gender);
    }

    const expertise = searchParams.get("expertise");
    if (expertise) {
      where.expertiseId = parseInt(expertise);
    }

    const isVerified = searchParams.get("isVerified");
    if (isVerified) {
      where.isVerified = isVerified === "true";
    }

    const query = searchParams.get("query");
    if (query) {
      where.OR = [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          expertise: {
            label: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          addresses: {
            some: {
              location: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        image: true,
        isVerified: true,
        firstAvailableAppointment: true,
        gender: {
          select: {
            label: true,
          },
        },
        expertise: {
          select: {
            label: true,
          },
        },
        addresses: {
          take: 1,
          select: {
            location: true,
          },
        },
      },
    });

    const formatedDoctors = doctors.map((doctor) => ({
      ...doctor,
      gender: doctor.gender.label,
      expertise: doctor.expertise.label,
      averageRating: 0, //TODO should update when vote added
    }));

    return NextResponse.json({ data: formatedDoctors }, { status: 200 });
  });
}
