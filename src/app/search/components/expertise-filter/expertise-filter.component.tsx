"use client";

import { ReactNode, useContext, useEffect, useState } from "react";

import clsx from "clsx";

import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

import ButtonComponent from "@/components/button/button.component";
import CardComponent from "@/components/card/card.component";

import { OptionType } from "@/types/option.type";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "./expertise-filter.module.css";

export default function ExpertiseFilterComponent(): ReactNode {
  const [expertises, setExpertises] = useState<OptionType[]>([]);

  const { filters, dispatchFilters } = useContext(FiltersContext);

  useEffect(() => {
    const getDoctors = async () => {
      const result = await fetchWithToast<OptionType[]>(
        "/api/doctor/expertise",
      );

      if (result.data) {
        setExpertises(result.data);
      }
    };
    getDoctors().then();
  }, []);

  return (
    <CardComponent showShadow className={styles.card}>
      <b>تخصص</b>
      <ul>
        {expertises.map((item) => (
          <li key={item.value}>
            <ButtonComponent
              size="medium"
              className={clsx(
                styles.button,
                filters.expertise === `${item.value}` && styles.active,
              )}
              onClick={() =>
                dispatchFilters({
                  type: "updated_filter",
                  key: "expertise",
                  value: `${item.value}`,
                })
              }
            >
              {item.label}
            </ButtonComponent>
          </li>
        ))}
      </ul>
    </CardComponent>
  );
}
