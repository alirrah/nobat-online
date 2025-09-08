"use client";

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Loading from "@/app/loading";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<CompactedDoctorType[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);

      const orderingParam = ordering ? String(ordering) : "";

      const formattedFilters = Object.fromEntries(
        Object.entries(filters)
          .map(([key, value]) => [key, value ? String(value) : ""])
          .filter(([, value]) => value !== ""),
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

      setLoading(false);
    };
    getDoctors().then();
  }, [filters, ordering]);

  return (
    <DoctorsContext.Provider value={{ doctors }}>
      {loading ? <Loading /> : children}
    </DoctorsContext.Provider>
  );
}
