"use client";

import { ReactNode, useContext } from "react";

import ToggleComponent from "@/app/search/components/toggle/toggle.component";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

import CardComponent from "@/components/card/card.component";

import { GenderEnum } from "@/enums/gender.enum";

import styles from "./gender-an-is-verified-filters.module.css";

export default function GenderAnIsVerifiedFiltersComponent(): ReactNode {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  return (
    <CardComponent showShadow className={styles.card}>
      <b>جنسیت</b>
      <div className={styles["gender-box"]}>
        <label>
          <input
            type="radio"
            name="gender"
            value="man"
            checked={filters.gender === GenderEnum.MAN}
            onChange={() =>
              dispatchFilters({
                type: "updated_filter",
                key: "gender",
                value: GenderEnum.MAN,
              })
            }
          />
          آقا
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="woman"
            checked={filters.gender === GenderEnum.WOMAN}
            onChange={() =>
              dispatchFilters({
                type: "updated_filter",
                key: "gender",
                value: GenderEnum.WOMAN,
              })
            }
          />
          خانم
        </label>
      </div>
      <div className={styles.divider}></div>
      <div className={styles["selection-box"]}>
        <b>منتخب نوبت آنلاین</b>
        <ToggleComponent
          onChange={() =>
            dispatchFilters({
              type: "updated_filter",
              key: "isVerified",
              value: !filters.isVerified,
            })
          }
          checked={filters.isVerified}
        />
      </div>
    </CardComponent>
  );
}
