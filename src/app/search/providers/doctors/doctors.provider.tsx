"use client";

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { FiltersContext } from "@/app/search/providers/filters/filters.provider";
import { OrderContext } from "@/app/search/providers/order/order.provider";

import { OrderingEnum } from "@/enums/ordering.enum";

import { DoctorType } from "@/types/doctor.type";

type ContextValue = {
  filteredDoctors: DoctorType[];
};

export const DoctorsContext = createContext<ContextValue>({
  filteredDoctors: [],
});

type Props = PropsWithChildren & {
  items: DoctorType[];
};

export default function DoctorsProvider({ children, items }: Props): ReactNode {
  const { filters } = useContext(FiltersContext);
  const { ordering } = useContext(OrderContext);

  const [filteredDoctors, setFilteredDoctors] = useState<DoctorType[]>([]);

  const isVisible = useCallback(
    (doctor: DoctorType): boolean => {
      return (
        doesDoctorInclude(doctor, filters.query) &&
        doesInclude(doctor.expertise, filters.expertise) &&
        doesInclude(doctor.gender, filters.gender) &&
        ((doctor.isVerified && !!filters.isVerified) || !filters.isVerified)
      );
    },
    [filters],
  );

  useEffect(() => {
    const filteredDoctors = items.filter(isVisible);

    filteredDoctors.sort((firstDoctor, secondDoctor) => {
      if (ordering === OrderingEnum.RATE) {
        return secondDoctor.averageRating - firstDoctor.averageRating;
      }
      return firstDoctor.name.localeCompare(secondDoctor.name);
    });

    setFilteredDoctors(filteredDoctors);
  }, [filters, isVisible, items, ordering]);

  return (
    <DoctorsContext.Provider value={{ filteredDoctors }}>
      {children}
    </DoctorsContext.Provider>
  );
}

function doesDoctorInclude(doctor: DoctorType, query?: string): boolean {
  if (!query) {
    return true;
  }

  return doesSomeInclude(
    [doctor.name, doctor.expertise].concat(
      doctor.addresses.map((address) => address.location),
    ),
    query,
  );
}

function doesSomeInclude(items: string[], query?: string): boolean {
  if (!query) {
    return true;
  }

  return items.some((item) => doesInclude(item, query));
}

function doesInclude(item: string, query?: string): boolean {
  if (!query) {
    return true;
  }

  return item.toLowerCase().includes(query.toLowerCase());
}
