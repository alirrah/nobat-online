import { NextRequest, NextResponse } from "next/server";

import { ApiResponseType } from "@/types/api-response.type";

import { extractUserID, wrapWithTryCatch } from "@/utils/api.util";

export async function GET(
  request: NextRequest,
): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    const foundUser = await extractUserID(request, "header");

    if (foundUser) {
      return NextResponse.json({ data: null }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }
  });
}
