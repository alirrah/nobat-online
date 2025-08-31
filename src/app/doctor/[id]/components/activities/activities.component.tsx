import { ReactNode } from "react";

import CardComponent from "@/components/card/card.component";

import MingcuteChatLine from "@/icons/MingcuteChatLine";
import MingcuteMedalLine from "@/icons/MingcuteMedalLine";

import { DoctorType } from "@/types/doctor.type";

import { convertDate } from "@/utils/date-time.util";

import styles from "./activities.module.css";

type Props = {
  doctor: DoctorType;
};

export default function ActivitiesComponent({ doctor }: Props): ReactNode {
  const activeConsultNumber = doctor.activeConsultNumber || 0;

  return (
    <CardComponent
      showShadow
      outsideTitle="فعالیت‌ها"
      className={styles.activities}
    >
      <CardComponent className={styles.activity}>
        <MingcuteMedalLine />
        <p>
          نوبت آنلاین از تاریخ {convertDate(`${doctor.createdAt}`)} افتخار
          میزبانی از صفحه اختصاصی {doctor.name} را داشته است.
        </p>
      </CardComponent>
      {activeConsultNumber !== 0 && (
        <CardComponent className={styles.activity}>
          <MingcuteChatLine />
          <p>
            <b>{activeConsultNumber}</b> مشاوره فعال
          </p>
        </CardComponent>
      )}
    </CardComponent>
  );
}
