import { OrderingEnum } from "@/enums/ordering.enum";

export type OrderingAction = { type: OrderingEnum };

export function OrderingReducer(state: OrderingEnum, action: OrderingAction) {
  switch (action.type) {
    case OrderingEnum.DEFAULT:
      return OrderingEnum.DEFAULT;
    case OrderingEnum.ALPHABETICALLY:
      return OrderingEnum.ALPHABETICALLY;
    default:
      return state;
  }
}
