import { ReactNode } from "react";

import CardComponent from "@/components/card/card.component";
import ButtonComponent from "@/components/button/button.component";

import MingcuteWalkFill from "@/icon/MingcuteWalkFill";
import MingcuteArrowsLeftLine from "@/icon/MingcuteArrowsLeftLine";

import styles from "./get-appointment.module.css";

export default function GetAppointmentComponent(): ReactNode {
  return (
    <CardComponent
      showShadow
      className={styles["get-turn"]}
      title={
        <div className={styles.title}>
          <MingcuteWalkFill />
          <b>نوبت اینترنتی و مراجعه حضوری</b>
        </div>
      }
    >
      <ul>
        <li>امکان دریافت زودترین نوبت</li>
      </ul>
      <ButtonComponent
        variant="primary"
        shape="solid"
        size="medium"
        className={styles.button}
      >
        <p>دریافت نوبت</p>
        <MingcuteArrowsLeftLine />
      </ButtonComponent>
    </CardComponent>
  );
}
