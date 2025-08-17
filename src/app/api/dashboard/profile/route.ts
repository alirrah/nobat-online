import { NextRequest, NextResponse } from "next/server";

import Prisma from "@prisma/client";

import { EditProfileDto } from "@/dto/edit-profile.dto";

import prisma from "@/lib/prisma";

import { ApiResponseType } from "@/types/api-response.type";
import { SafeUserType } from "@/types/safe-user.type";

import {
  checkRequiredFields,
  extractUserID,
  parseBody,
  wrapWithTryCatch,
} from "@/utils/api.util";
import { hashPassword } from "@/utils/bcrypt.util";

export async function GET(
  request: NextRequest,
): Promise<ApiResponseType<SafeUserType>> {
  return wrapWithTryCatch(async () => {
    const foundUser = await findUser(request);

    if (!foundUser) {
      return NextResponse.json(
        { error: "ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...safeUser } = foundUser;

    return NextResponse.json({ data: safeUser }, { status: 200 });
  });
}

export async function PATCH(
  request: NextRequest,
): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    const [parseError, body] = await parseBody<EditProfileDto>(request);

    if (parseError !== null) {
      return NextResponse.json({ error: parseError }, { status: 400 });
    }

    const RequiredField = checkRequiredFields<EditProfileDto>(body, [
      { attribute: "name", name: "نام و نام خانوادگی" },
      { attribute: "username", name: "نام کاربری" },
      { attribute: "email", name: "ایمیل" },
    ]);

    if (typeof RequiredField === "string") {
      return NextResponse.json({ error: RequiredField }, { status: 400 });
    }

    const foundUser = await findUser(request);

    if (!foundUser) {
      return NextResponse.json(
        { error: "ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    await prisma.user.update({
      where: { id: foundUser.id },
      data: body,
    });

    return NextResponse.json({ data: null }, { status: 200 });
  });
}

async function findUser(request: NextRequest): Promise<Prisma.User | null> {
  const userID = await extractUserID(request);

  if (!userID) {
    return null;
  }

  const foundUser = await prisma.user.findUnique({
    where: { id: userID },
  });

  if (!foundUser) {
    return null;
  }

  return foundUser;
}
