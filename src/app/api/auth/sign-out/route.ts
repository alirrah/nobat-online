import { NextResponse } from "next/server";

import { ApiResponseType } from "@/types/api-response.type";

import { removeRefreshToken, wrapWithTryCatch } from "@/utils/api.util";

export async function POST(): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    await removeRefreshToken();

    return NextResponse.json({ data: null }, { status: 200 });
  });
}
