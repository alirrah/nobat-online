import { NextResponse } from "next/server";

import { SignUpDto } from "@/dto/auth.dto";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";

import {
  checkRequiredFields,
  parseBody,
  setAuthCookie,
  wrapWithTryCatch,
} from "@/utils/api.util";
import { hashPassword } from "@/utils/bcrypt.util";

export async function POST(request: Request): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    const [parseError, body] = await parseBody<SignUpDto>(request);

    if (parseError !== null) {
      return NextResponse.json({ error: parseError }, { status: 400 });
    }

    const RequiredField = checkRequiredFields<SignUpDto>(body, [
      { attribute: "name", name: "نام و نام خانوداگی" },
      { attribute: "username", name: "نام کاربری" },
      { attribute: "email", name: "ایمیل" },
      { attribute: "password", name: "رمز عبور" },
    ]);

    if (typeof RequiredField === "string") {
      return NextResponse.json({ error: RequiredField }, { status: 400 });
    }

    let foundUser = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (foundUser) {
      return NextResponse.json(
        { error: "نام کاربری تکراری است." },
        { status: 400 },
      );
    }

    foundUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (foundUser) {
      return NextResponse.json({ error: "ایمیل تکراری است." }, { status: 400 });
    }

    const hashedPassword = await hashPassword(body.password);
    const createdUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    await setAuthCookie(createdUser.id);

    return NextResponse.json({ data: null }, { status: 201 });
  });
}
