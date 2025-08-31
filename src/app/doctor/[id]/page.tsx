"use client";

import { ReactNode, useEffect, useState } from "react";

import { notFound } from "next/navigation";

import AboutMeComponent from "@/app/doctor/[id]/components/about-me/about-me.component";
import ActivitiesComponent from "@/app/doctor/[id]/components/activities/activities.component";
import AddressComponent from "@/app/doctor/[id]/components/address/address.component";
import CommentComponent from "@/app/doctor/[id]/components/comments/comments.component";
import GetAppointmentComponent from "@/app/doctor/[id]/components/get-appointment/get-appointment.component";
import InfoComponent from "@/app/doctor/[id]/components/info/info.component";
import OnlineVisitComponent from "@/app/doctor/[id]/components/online-visit/online-visit.component";
import Loading from "@/app/loading";

import { DoctorType } from "@/types/doctor.type";

import { fetchWithToast } from "@/utils/fetch.util";

import styles from "./page.module.css";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props): ReactNode {
  const [doctor, setDoctor] = useState<DoctorType | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const getDoctor = async () => {
      const result = await fetchWithToast<DoctorType>(
        `/api/doctor/${params.id}`,
      );

      if (result.data) {
        setDoctor(result.data);
      }
    };
    getDoctor().then();
  }, [params]);

  if (doctor === null) {
    return notFound();
  }

  if (doctor === undefined) {
    return <Loading />;
  }

  return (
    <div className={styles["doctor-id-page"]}>
      <section>
        <InfoComponent doctor={doctor} />
        <AboutMeComponent aboutMe={doctor.aboutMe} />
        <ActivitiesComponent doctor={doctor} />
        <CommentComponent name={doctor.name} />
      </section>
      <aside>
        <OnlineVisitComponent
          doctorName={doctor.name}
          onlineVisitPrice={doctor.onlineVisitPrice}
        />
        <GetAppointmentComponent />
        <AddressComponent doctorAddresses={doctor.addresses} />
      </aside>
    </div>
  );
}
