"use client";

import { ReactNode, useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { DoctorsContext } from "@/app/search/providers/doctors/doctors.provider";

import CardComponent from "@/components/card/card.component";

import { GenderEnum } from "@/enums/gender.enum";

import MingcuteCheckFill from "@/icons/MingcuteCheckFill";
import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import MingcuteStarFill from "@/icons/MingcuteStarFill";

import styles from "./results.module.css";

type Props = {
  className?: string;
};

export default function ResultsComponent({ className }: Props): ReactNode {
  const { filteredDoctors } = useContext(DoctorsContext);

  return (
    <ul className={clsx(styles.results, className)}>
      {filteredDoctors.map((doctor) => (
        <li key={doctor.id}>
          <CardComponent showShadow className={styles.box}>
            <div className={styles["doctor-card"]}>
              <div className={styles.image}>
                <Image
                  src={`https://cdn.paziresh24.com${doctor.image}`}
                  alt="عکس پروفایل دکتر"
                  width={150}
                  height={150}
                />
                {doctor.isVerified && <MingcuteCheckFill />}
              </div>
              <div className={styles.info}>
                <b className={styles.title}>
                  {doctor.gender === GenderEnum.MAN
                    ? `${GenderEnum.MAN}ی `
                    : `${GenderEnum.WOMAN} `}
                  دکتر {doctor.name}
                </b>
                <p className={styles.category}>{doctor.expertise}</p>
                <p className={styles.address}>
                  <MingcuteLocationLine /> {doctor.addresses?.[0].location}
                </p>
                <p className={styles.time}>
                  اولین نوبت: <b>{doctor.firstAvailableAppointment}</b>
                </p>
              </div>
              <div className={styles.star}>
                <MingcuteStarFill />
                <p>{Math.round(doctor.averageRating * 10) / 10}</p>
              </div>
            </div>
            <Link href={`/doctor/${doctor.id}`}>دریافت نوبت</Link>
          </CardComponent>
        </li>
      ))}
    </ul>
  );
}
