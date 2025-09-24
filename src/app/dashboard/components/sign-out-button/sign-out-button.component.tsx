"use client";

import { ReactNode, useContext } from "react";

import { useRouter } from "next/navigation";

import MingcuteExitLine from "@/icons/MingcuteExitLine";

import { AuthTokenContext } from "@/providers/auth-token/auth-token.provider";

import { fetchWithToast } from "@/utils/fetch.util";

type Props = {
  className: string;
};

export default function SignOutButtonComponent({
  className,
}: Props): ReactNode {
  const router = useRouter();

  const { setToken } = useContext(AuthTokenContext);

  const signOutButtonClickHandler = async (): Promise<void> => {
    const result = await fetchWithToast<null>(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      null,
      setToken,
      "به امید دیدار!",
    );

    if (result.error) {
      return;
    }

    setToken(null);
    router.push("/");
  };
  return (
    <button className={className} onClick={signOutButtonClickHandler}>
      <MingcuteExitLine />
      خروج
    </button>
  );
}
