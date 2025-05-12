"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

import Error from "next/error";

import Loading from "@/app/loading";

import ButtonComponent from "@/components/button/button.component";
import InputComponent from "@/components/input/input.component";

import { EditProfileDto } from "@/dto/edit-profile.dto";

import MingcuteEye2Line from "@/icons/MingcuteEye2Line";
import MingcuteEyeCloseLine from "@/icons/MingcuteEyeCloseLine";
import MingcuteIdcardFill from "@/icons/MingcuteIdcardFill";
import MingcuteLockFill from "@/icons/MingcuteLockFill";
import MingcuteMailFill from "@/icons/MingcuteMailFill";
import MingcuteUser3Fill from "@/icons/MingcuteUser3Fill";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "./profile-form.module.css";

export default function ProfileFormComponent(): ReactNode {
  const [values, setValues] = useState<EditProfileDto>({});
  const [status, setStatus] = useState<"padding" | "error" | "success">(
    "success",
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetchWithToast<EditProfileDto>(
        "/api/dashboard/profile",
      );

      if (result.error) {
        setStatus("error");
        return;
      }

      setValues(result.data!);
      setStatus("success");
    };

    fetchProfile().then();
  }, []);

  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const result = await fetchWithToast<null>(
      "/api/dashboard/profile",
      {
        method: "PATCH",
        body: JSON.stringify(values),
      },
      "ویرایش با موفقیت انجام شد.",
    );

    if (result.error) {
      return;
    }
  };

  if (status === "padding") {
    return <Loading />;
  }

  if (status === "error") {
    return <h1>نشد که بشه</h1>;
  }

  return (
    <div className={styles["profile-form"]}>
      <h1>ویرایش پروفایل</h1>
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <InputComponent
          prefixIcon={<MingcuteIdcardFill />}
          name="name"
          placeholder="نام و نام خانوادگی"
          value={values.name}
          onChange={(e) =>
            setValues((old) => ({ ...old, name: e.target.value }))
          }
        />
        <InputComponent
          prefixIcon={<MingcuteUser3Fill />}
          name="username"
          placeholder="نام کاربری"
          value={values.username}
          onChange={(e) =>
            setValues((old) => ({ ...old, username: e.target.value }))
          }
        />
        <InputComponent
          prefixIcon={<MingcuteMailFill />}
          placeholder="ایمیل"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) =>
            setValues((old) => ({ ...old, email: e.target.value }))
          }
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
          autoComplete="new-password"
          value={values.password}
          onChange={(e) =>
            setValues((old) => ({ ...old, password: e.target.value }))
          }
        />
        <ButtonComponent
          variant="primary"
          shape="solid"
          className={styles.submit}
        >
          ذخیره
        </ButtonComponent>
      </form>
    </div>
  );
}
