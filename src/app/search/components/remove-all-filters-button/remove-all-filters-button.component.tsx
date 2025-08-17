"use client";

import { ReactNode, useContext, useMemo } from "react";

import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

import ButtonComponent from "@/components/button/button.component";

export default function RemoveAllFiltersButtonComponent(): ReactNode {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const isEmpty = useMemo(() => {
    return (
      !filters.query &&
      !filters.isVerified &&
      !filters.expertise &&
      !filters.gender
    );
  }, [filters]);

  if (isEmpty) {
    return null;
  }

  return (
    <ButtonComponent
      variant="danger"
      shape="outlined"
      onClick={() =>
        dispatchFilters({
          type: "removed_all",
        })
      }
    >
      حذف تمام فیلترها
    </ButtonComponent>
  );
}
