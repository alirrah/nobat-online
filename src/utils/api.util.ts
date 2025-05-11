import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";

import { ApiResponseType } from "@/types/api-response.type";

type ParseBodyResult<T> = [error: null, data: T] | [error: string, data: null];

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

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

export async function setAuthCookie(userID: string): Promise<void> {
  const cookieStore = cookies();

  const token = await new jose.SignJWT()
    .setSubject(userID)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(secret);

  cookieStore.set(process.env.TOKEN_KEY!, token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 3 * 24 * 3600,
  });
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(process.env.TOKEN_KEY!);
}

export async function extractUserID(
  request: NextRequest,
): Promise<string | null> {
  const token = request.cookies.get(process.env.TOKEN_KEY!)?.value;

  if (!token) {
    return null;
  }

  try {
    await jose.jwtVerify(token, secret);

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
