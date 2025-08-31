"use client";

import { ReactNode, useContext } from "react";

import clsx from "clsx";

import OrderingComponent from "@/app/search/components/ordering/ordering.component";
import { DoctorsContext } from "@/app/search/providers/doctors/doctors.provider";

import styles from "./top-bar.module.css";

type Props = {
  className?: string;
};

export default function TopBarComponent({ className }: Props): ReactNode {
  const { doctors } = useContext(DoctorsContext);

  return (
    <div className={clsx(styles["top-bar"], className)}>
      <OrderingComponent />
      <p>{doctors.length.toLocaleString()} نتیجه</p>
    </div>
  );
}
