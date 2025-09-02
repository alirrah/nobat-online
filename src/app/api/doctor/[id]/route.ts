import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { DoctorType } from "@/types/doctor.type";

import { wrapWithTryCatch } from "@/utils/api.util";
import { isNumeric } from "@/utils/type.util";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
): Promise<ApiResponseType<DoctorType | null>> {
  return wrapWithTryCatch(async () => {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "مقدار فیلد شناسه دکتر اجبار است." },
        { status: 400 },
      );
    }

    if (!isNumeric(id)) {
      return NextResponse.json(
        { error: "شناسه دکتر اشتباه است." },
        { status: 400 },
      );
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
      include: {
        addresses: true,
        gender: true,
        expertise: true,
      },
    });

    if (!doctor) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    const formatedDoctor = {
      ...doctor,
      averageRating: 0, //TODO should update when vote added
      totalPeopleRate: 0, //TODO should update when vote added
    };

    return NextResponse.json({ data: formatedDoctor }, { status: 200 });
  });
}
