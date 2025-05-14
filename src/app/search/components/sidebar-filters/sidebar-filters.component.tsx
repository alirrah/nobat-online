import { ReactNode } from "react";

import clsx from "clsx";

import ExpertiseFilterComponent from "@/app/search/components/expertise-filter/expertise-filter.component";
import GenderAnIsVerifiedFiltersComponent from "@/app/search/components/gender-an-is-verified-filters/gender-an-is-verified-filters.component";
import RemoveAllFiltersButtonComponent from "@/app/search/components/remove-all-filters-button/remove-all-filters-button.component";

import styles from "./sidebar-filters.module.css";

type Props = {
  className?: string;
};

export default function SidebarFiltersComponent({
  className,
}: Props): ReactNode {
  return (
    <div className={clsx(styles.filters, className)}>
      <RemoveAllFiltersButtonComponent />
      <ExpertiseFilterComponent />
      <GenderAnIsVerifiedFiltersComponent />
    </div>
  );
}
