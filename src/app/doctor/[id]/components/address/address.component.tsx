import { ReactNode } from "react";

import CardComponent from "@/components/card/card.component";

import { AddressType } from "@/types/address.type";

import MingcutePhoneLine from "@/icon/MingcutePhoneLine";

import styles from "./address.module.css";

type Props = {
  doctorAddresses: AddressType[];
};

export default function AddressComponent({
  doctorAddresses,
}: Props): ReactNode {
  return (
    <CardComponent
      showShadow
      outsideTitle="آدرس و تلفن تماس"
      className={styles.address}
    >
      <ul>
        {doctorAddresses.map((address) => (
          <li key={address.id}>
            <b>{address.title}</b>
            <p>{address.location}</p>
            {address.phones?.map((phone) => (
              <a href={`tel:${phone}`} key={phone}>
                <MingcutePhoneLine />
                <p>{phone}</p>
              </a>
            ))}
          </li>
        ))}
      </ul>
    </CardComponent>
  );
}
