import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { DoctorType } from "@/types/doctor.type";

import { wrapWithTryCatch } from "@/utils/api.util";

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
      aboutMe: doctor.aboutMe?.replace(/\\n/g, "<br>"),
      addresses: doctor.addresses.map((address) => ({
        ...address,
        phones: address.phones
          ?.toString()
          .split("\n")
          .map((s) => s.replace(/"/g, ""))
          .filter(Boolean),
      })),
      averageRating: 0, //TODO should update when vote added
      totalPeopleRate: 0, //TODO should update when vote added
    };

    return NextResponse.json({ data: formatedDoctor }, { status: 200 });
  });
}
