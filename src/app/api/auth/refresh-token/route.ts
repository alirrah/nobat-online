import { NextRequest, NextResponse } from "next/server";

import { ApiResponseType } from "@/types/api-response.type";

import {
  extractUserID,
  generateAccessToken,
  removeRefreshToken,
  wrapWithTryCatch,
} from "@/utils/api.util";

export async function GET(
  request: NextRequest,
): Promise<ApiResponseType<string>> {
  return wrapWithTryCatch(async () => {
    const foundUser = await extractUserID(request);

    if (foundUser) {
      return NextResponse.json(
        { data: await generateAccessToken(foundUser) },
        { status: 200 },
      );
    } else {
      await removeRefreshToken();

      return NextResponse.json(
        { error: "ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }
  });
}
