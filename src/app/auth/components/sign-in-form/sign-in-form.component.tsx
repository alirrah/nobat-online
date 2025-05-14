"use client";

import { FormEvent, ReactNode, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import ButtonComponent from "@/components/button/button.component";
import InputComponent from "@/components/input/input.component";

import { SignInDto } from "@/dto/auth.dto";

import MingcuteEye2Line from "@/icons/MingcuteEye2Line";
import MingcuteEyeCloseLine from "@/icons/MingcuteEyeCloseLine";
import MingcuteLockFill from "@/icons/MingcuteLockFill";
import MingcuteUser3Fill from "@/icons/MingcuteUser3Fill";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "@/app/auth/styles/auth-form.module.css";

export default function SignInFormComponent(): ReactNode {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto: SignInDto = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const result = await fetchWithToast<null>(
      "/api/auth/sign-in",
      {
        method: "POST",
        body: JSON.stringify(dto),
      },
      "خوش آمدید!",
    );

    if (result.error) {
      return;
    }

    formRef.current?.reset();
    router.push("/dashboard");
  };

  return (
    <form ref={formRef} onSubmit={formSubmitHandler} className={styles.form}>
      <InputComponent
        prefixIcon={<MingcuteUser3Fill />}
        name="username"
        placeholder="نام کاربری"
        required
      />
      <InputComponent
        prefixIcon={<MingcuteLockFill />}
        suffixIcon={
          showPassword ? <MingcuteEye2Line /> : <MingcuteEyeCloseLine />
        }
        onSuffixClick={() => setShowPassword((old) => !old)}
        name="password"
        placeholder="رمز عبور"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
      />
      <ButtonComponent
        variant="primary"
        shape="solid"
        className={styles.submit}
      >
        ورود
      </ButtonComponent>
    </form>
  );
}
