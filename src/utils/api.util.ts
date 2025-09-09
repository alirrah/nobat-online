import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";

import { ApiResponseType } from "@/types/api-response.type";

type ParseBodyResult<T> = [error: null, data: T] | [error: string, data: null];

const alg = "HS256";
const refreshTokenSecret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET,
);
const accessTokenSecret = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET,
);

export async function parseBody<T>(
  request: Request,
): Promise<ParseBodyResult<T>> {
  try {
    const body = await request.json();
    return [null, body];
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "SyntaxError") {
        return ["فرمت body نادرست است.", null];
      }

      return [error.message, null];
    }

    if (typeof error === "string") {
      return [error, null];
    }

    return ["خطای غیرمنتظره رخ داد.", null];
  }
}

export async function wrapWithTryCatch<T>(
  callback: () => Promise<ApiResponseType<T>>,
): Promise<ApiResponseType<T>> {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "خطای غیرمنتظره رخ داد." },
      { status: 500 },
    );
  }
}

export function checkRequiredFields<T>(
  data: T,
  fields: { attribute: keyof T; name: string }[],
): string | void {
  for (const field of fields) {
    if (!data[field.attribute]) {
      return `مقدار فیلد ${field.name} اجباری است.`;
    }
  }
}

export async function setRefreshToken(userID: string): Promise<void> {
  const cookieStore = cookies();

  const refreshToken = await new jose.SignJWT()
    .setSubject(userID)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshTokenSecret);

  cookieStore.set(process.env.REFRESH_TOKEN_KEY!, refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 3 * 24 * 3600,
  });
}

export async function removeRefreshToken(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(process.env.REFRESH_TOKEN_KEY!);
}

export async function generateAccessToken(userID: string): Promise<string> {
  return await new jose.SignJWT()
    .setSubject(userID)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(accessTokenSecret);
}

export async function extractUserID(
  request: NextRequest,
  source: "header" | "cookie" = "cookie",
): Promise<string | null> {
  let token: string | undefined;

  if (source === "header") {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    token = authHeader.substring(7);
  } else {
    token = request.cookies.get(process.env.REFRESH_TOKEN_KEY!)?.value;
  }

  if (!token) {
    return null;
  }

  try {
    await jose.jwtVerify(
      token,
      source === "header" ? accessTokenSecret : refreshTokenSecret,
    );

    const claims = jose.decodeJwt(token);

    if (!claims.sub) {
      return null;
    }

    return claims.sub;
  } catch (error) {
    console.log(error);
    return null;
  }
}
