import { ReactNode } from "react";

import ResultsComponent from "@/app/search/components/results/results.component";
import SidebarFiltersComponent from "@/app/search/components/sidebar-filters/sidebar-filters.component";
import TopBarComponent from "@/app/search/components/top-bar/top-bar.component";
import DoctorsProvider from "@/app/search/providers/doctors/doctors.provider";
import FiltersProvider from "@/app/search/providers/filters/filters.provider";
import OrderProvider from "@/app/search/providers/order/order.provider";

import GlobalSearchBoxComponent from "@/components/global-search-box/global-search-box.component";

import { OrderingEnum } from "@/enums/ordering.enum";

import { FiltersType } from "@/types/filters.type";

import styles from "./page.module.css";

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: Props): ReactNode {
  const defaultFilters = generateDefaultFilters(searchParams);
  const defaultOrdering = generateDefaultOrdering(searchParams);

  return (
    <div className={styles["search-page"]}>
      <FiltersProvider defaultFilters={defaultFilters}>
        <OrderProvider defaultOrdering={defaultOrdering}>
          <GlobalSearchBoxComponent />
          <div className={styles.results}>
            <SidebarFiltersComponent className={styles["filters"]} />
            <DoctorsProvider>
              <TopBarComponent className={styles["ordering"]} />
              <ResultsComponent className={styles["results-list"]} />
            </DoctorsProvider>
          </div>
        </OrderProvider>
      </FiltersProvider>
    </div>
  );
}

function generateDefaultFilters(searchParams: SearchParams): FiltersType {
  const { query, expertise, gender, isVerified } = searchParams;

  const normalizedExpertise = normalizeFilter(expertise);
  const normalizedGender = normalizeFilter(gender);
  const isVerifiedBoolean = normalizeFilter(isVerified) === "true";

  return {
    query: normalizeFilter(query),
    expertise: normalizedExpertise,
    gender: normalizedGender,
    isVerified: isVerifiedBoolean,
  };
}

function generateDefaultOrdering(searchParams: SearchParams): OrderingEnum {
  const { ordering } = searchParams;

  let normalizedOrdering = normalizeFilter(ordering);

  if (!normalizedOrdering) {
    normalizedOrdering = OrderingEnum.DEFAULT;
  }

  return normalizedOrdering as OrderingEnum;
}

function normalizeFilter(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
