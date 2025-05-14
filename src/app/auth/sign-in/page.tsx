import { ReactNode } from "react";

import Link from "next/link";

import SignInFormComponent from "@/app/auth/components/sign-in-form/sign-in-form.component";

import CardComponent from "@/components/card/card.component";

import styles from "@/app/auth/styles/auth-page.module.css";

export default function Page(): ReactNode {
  return (
    <CardComponent
      outsideClassName={styles["outside-page"]}
      className={styles.page}
      showShadow
    >
      <h1>ورود!</h1>
      <SignInFormComponent />
      <div className={styles["sign-up"]}>
        <p>قبلاً ثبت‌نام نکردید؟</p>
        <Link href="/auth/sign-up">ثبت‌نام کنید</Link>
      </div>
    </CardComponent>
  );
}
