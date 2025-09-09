"use client";

import { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { ACCESS_TOKEN_KEY } from "@/config";

import MingcuteExitLine from "@/icons/MingcuteExitLine";

import { fetchWithToast } from "@/utils/fetch.util";

type Props = {
  className: string;
};

export default function SignOutButtonComponent({
  className,
}: Props): ReactNode {
  const router = useRouter();

  const signOutButtonClickHandler = async (): Promise<void> => {
    const result = await fetchWithToast<null>(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      "به امید دیدار!",
    );

    if (result.error) {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    router.push("/");
  };
  return (
    <button className={className} onClick={signOutButtonClickHandler}>
      <MingcuteExitLine />
      خروج
    </button>
  );
}
