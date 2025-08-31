"use client";

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { OrderContext } from "@/app/search/providers/order/order.provider";

import { CompactedDoctorType } from "@/types/compacted-doctor.type";

import { fetchWithToast } from "@/utils/fetch.util";

type ContextValue = {
  doctors: CompactedDoctorType[];
};

export const DoctorsContext = createContext<ContextValue>({
  doctors: [],
});

type Props = PropsWithChildren;

export default function DoctorsProvider({ children }: Props): ReactNode {
  const { filters } = useContext(FiltersContext);
  const { ordering } = useContext(OrderContext);

  const [doctors, setDoctors] = useState<CompactedDoctorType[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      const orderingParam = ordering ? String(ordering) : "";

      const formattedFilters: Record<string, string> = Object.keys(
        filters,
      ).reduce(
        (acc, key) => {
          const value = filters[key as keyof typeof filters];
          acc[key] = value ? String(value) : "";
          return acc;
        },
        {} as Record<string, string>,
      );

      const params = new URLSearchParams({
        order: orderingParam,
        ...formattedFilters,
      });

      const result = await fetchWithToast<CompactedDoctorType[]>(
        `/api/doctor?${params.toString()}`,
      );

      if (result.data) {
        setDoctors(result.data);
      }
    };
    getDoctors().then();
  }, [filters, ordering]);

  return (
    <DoctorsContext.Provider value={{ doctors }}>
      {children}
    </DoctorsContext.Provider>
  );
}
