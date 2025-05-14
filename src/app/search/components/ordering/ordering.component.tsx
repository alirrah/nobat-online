"use client";

import { ReactNode, useContext } from "react";

import { OrderContext } from "@/app/search/providers/order/order.provider";

import CardComponent from "@/components/card/card.component";

import { OrderingEnum } from "@/enums/ordering.enum";

import styles from "./ordering.module.css";

export default function OrderingComponent(): ReactNode {
  const { ordering, dispatchOrder } = useContext(OrderContext);

  return (
    <CardComponent showShadow className={styles.card}>
      <label htmlFor="ordering">مرتب سازی براساس:</label>
      <select
        name="ordering"
        id="ordering"
        value={ordering}
        onChange={(event) =>
          dispatchOrder({
            type: event.currentTarget.value as OrderingEnum,
          })
        }
      >
        <option value={OrderingEnum.ALPHABETICALLY}>حروف الفبا</option>
        <option value={OrderingEnum.RATE}>محبوب ترین</option>
      </select>
    </CardComponent>
  );
}
