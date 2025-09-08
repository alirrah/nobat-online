"use client";

import { ReactNode, useContext, useEffect, useState } from "react";

import ToggleComponent from "@/app/search/components/toggle/toggle.component";
import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

import CardComponent from "@/components/card/card.component";

import { OptionType } from "@/types/option.type";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "./gender-and-is-verified-filters.module.css";

export default function GenderAndIsVerifiedFiltersComponent(): ReactNode {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const [gender, setGender] = useState<OptionType[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      const result = await fetchWithToast<OptionType[]>("/api/doctor/gender");

      if (result.data) {
        setGender(result.data);
      }
    };
    getDoctors().then();
  }, []);

  return (
    <CardComponent showShadow className={styles.card}>
      <b>جنسیت</b>
      <div className={styles["gender-box"]}>
        {gender.map((item) => (
          <label key={item.value}>
            <input
              type="radio"
              name="gender"
              value={item.label}
              checked={filters.gender === `${item.value}`}
              onChange={() =>
                dispatchFilters({
                  type: "updated_filter",
                  key: "gender",
                  value: `${item.value}`,
                })
              }
            />
            {item.label}
          </label>
        ))}
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
