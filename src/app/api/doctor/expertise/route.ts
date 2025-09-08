import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { OptionType } from "@/types/option.type";

import { wrapWithTryCatch } from "@/utils/api.util";

export async function GET(): Promise<ApiResponseType<OptionType[]>> {
  return wrapWithTryCatch(async () => {
    const expertises = await prisma.expertise.findMany();

    const formatedExpertises = expertises.map(({ id, label }) => ({
      value: id,
      label,
    }));

    return NextResponse.json({ data: formatedExpertises }, { status: 200 });
  });
}
