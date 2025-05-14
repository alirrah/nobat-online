import { ReactNode } from "react";

import { notFound } from "next/navigation";

import AboutMeComponent from "@/app/doctor/[id]/components/about-me/about-me.component";
import ActivitiesComponent from "@/app/doctor/[id]/components/activities/activities.component";
import AddressComponent from "@/app/doctor/[id]/components/address/address.component";
import CommentComponent from "@/app/doctor/[id]/components/comments/comments.component";
import GetAppointmentComponent from "@/app/doctor/[id]/components/get-appointment/get-appointment.component";
import InfoComponent from "@/app/doctor/[id]/components/info/info.component";
import OnlineVisitComponent from "@/app/doctor/[id]/components/online-visit/online-visit.component";

import { doctors } from "@/mock/doctors";

import styles from "./page.module.css";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props): ReactNode {
  const doctor = doctors.find((doctor) => `${doctor.id}` === params.id);

  if (!doctor) {
    return notFound();
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
