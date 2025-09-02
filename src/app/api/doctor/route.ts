import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { OrderingEnum } from "@/enums/ordering.enum";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { CompactedDoctorType } from "@/types/compacted-doctor.type";

import { wrapWithTryCatch } from "@/utils/api.util";
import { isBoolean, isNumeric } from "@/utils/type.util";

export async function GET(
  request: Request,
): Promise<ApiResponseType<CompactedDoctorType[]>> {
  return wrapWithTryCatch(async () => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const where: Prisma.DoctorWhereInput = {};
    let orderBy: Prisma.DoctorOrderByWithRelationInput | undefined = undefined;

    const gender = searchParams.get("gender");
    if (gender) {
      if (!isNumeric(gender)) {
        return NextResponse.json(
          { error: "شناسه جنسیت اشتباه است." },
          { status: 400 },
        );
      }

      where.genderId = parseInt(gender);
    }

    const expertise = searchParams.get("expertise");
    if (expertise) {
      if (!isNumeric(expertise)) {
        return NextResponse.json(
          { error: "شناسه تخصص اشتباه است." },
          { status: 400 },
        );
      }

      where.expertiseId = parseInt(expertise);
    }

    const isVerified = searchParams.get("isVerified");
    if (isVerified) {
      if (!isBoolean(isVerified)) {
        return NextResponse.json(
          { error: "مقدار منتخب بودن اشتباه است." },
          { status: 400 },
        );
      }

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

    const order = searchParams.get("order");
    if (order) {
      if (
        order != OrderingEnum.ALPHABETICALLY &&
        OrderingEnum.DEFAULT != order
      ) {
        return NextResponse.json({ error: "" }, { status: 400 });
      }

      if (order === OrderingEnum.ALPHABETICALLY) {
        orderBy = {
          name: "asc",
        };
      }
    }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy,
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
