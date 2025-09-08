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

    const validation = validateDoctorSearchQuery(searchParams);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { gender, expertise, isVerified, query, order } = validation.data;

    const where: Prisma.DoctorWhereInput = {};
    let orderBy: Prisma.DoctorOrderByWithRelationInput | undefined;

    if (gender !== undefined) where.genderId = gender;
    if (expertise !== undefined) where.expertiseId = expertise;
    if (isVerified !== undefined) where.isVerified = isVerified;

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { expertise: { label: { contains: query, mode: "insensitive" } } },
        {
          addresses: {
            some: { location: { contains: query, mode: "insensitive" } },
          },
        },
      ];
    }

    if (order === OrderingEnum.ALPHABETICALLY) {
      orderBy = { name: "asc" };
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

type DoctorQueryParams = {
  gender?: number;
  expertise?: number;
  isVerified?: boolean;
  query?: string;
  order?: OrderingEnum;
};

function validateDoctorSearchQuery(
  searchParams: URLSearchParams,
):
  | { success: true; data: DoctorQueryParams }
  | { success: false; error: string } {
  const gender = searchParams.get("gender");
  const expertise = searchParams.get("expertise");
  const isVerified = searchParams.get("isVerified");
  const query = searchParams.get("query");
  const order = searchParams.get("order");

  const result: DoctorQueryParams = {};

  if (gender) {
    if (!isNumeric(gender)) {
      return { success: false, error: "شناسه جنسیت اشتباه است." };
    }
    result.gender = Number(gender);
  }

  if (expertise) {
    if (!isNumeric(expertise)) {
      return { success: false, error: "شناسه تخصص اشتباه است." };
    }
    result.expertise = Number(expertise);
  }

  if (isVerified) {
    if (!isBoolean(isVerified)) {
      return { success: false, error: "مقدار منتخب بودن اشتباه است." };
    }
    result.isVerified = isVerified === "true";
  }

  if (query) {
    result.query = query;
  }

  if (order) {
    if (
      ![OrderingEnum.ALPHABETICALLY, OrderingEnum.DEFAULT].includes(
        order as OrderingEnum,
      )
    ) {
      return { success: false, error: "مقدار مرتب‌سازی اشتباه است." };
    }
    result.order = order as OrderingEnum;
  }

  return { success: true, data: result };
}
