import { ReactNode } from "react";

import ButtonComponent from "@/components/button/button.component";
import CardComponent from "@/components/card/card.component";

import MingcuteArrowsLeftLine from "@/icons/MingcuteArrowsLeftLine";
import MingcuteWalkFill from "@/icons/MingcuteWalkFill";

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
