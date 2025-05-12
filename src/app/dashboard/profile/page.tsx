import { ReactNode } from "react";

import ProfileFormComponent from "@/app/dashboard/components/profile-form/profile-form.component";

import CardComponent from "@/components/card/card.component";

export default function Page(): ReactNode {
  return (
    <CardComponent showShadow>
      <ProfileFormComponent />
    </CardComponent>
  );
}
