"use client";

import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  createContext,
  useReducer,
} from "react";

import {
  OrderingAction,
  OrderingReducer,
} from "@/app/search/reducers/order/order.reducer";

import { OrderingEnum } from "@/enums/ordering.enum";

type Value = {
  ordering: OrderingEnum;
  dispatchOrder: Dispatch<OrderingAction>;
};

export const OrderContext = createContext<Value>({
  ordering: OrderingEnum.ALPHABETICALLY,
  dispatchOrder: () => {},
});

type Props = PropsWithChildren & {
  defaultOrdering: OrderingEnum;
};

export default function OrderProvider({
  children,
  defaultOrdering,
}: Props): ReactNode {
  const [ordering, dispatchOrder] = useReducer(
    OrderingReducer,
    defaultOrdering,
  );

  return (
    <OrderContext.Provider value={{ ordering, dispatchOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
