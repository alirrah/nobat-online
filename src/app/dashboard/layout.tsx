"use client";

import { ReactNode, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import SidebarComponent from "@/app/dashboard/components/sidebar/sidebar.component";
import Loading from "@/app/loading";

import { AuthTokenContext } from "@/providers/auth-token/auth-token.provider";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "./layout.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  const { token, setToken } = useContext(AuthTokenContext);

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticated = async (): Promise<void> => {
      setLoading(true);
      if (!token || token === "") {
        const result = await fetchWithToast<string>(
          "/api/auth/refresh-token",
          {},
          null,
        );

        if (result.data) {
          setToken(result.data);
        }

        if (result.error) {
          router.push("/auth/sign-in");
          return;
        }
      } else {
        const result = await fetchWithToast<null>(
          "/api/auth/verify",
          {},
          token,
        );

        if (result.error) {
          router.push("/auth/sign-in");
          return;
        }
      }
      setLoading(false);
    };

    isAuthenticated().then();
  }, [router, setToken, token]);

  if (loading) return <Loading />;

  return (
    <div className={styles.layout}>
      <SidebarComponent />
      {children}
    </div>
  );
}
