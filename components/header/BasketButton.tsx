import React from "react";
import { useSelector } from "react-redux";

import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";

export default function BasketButton(props: React.PropsWithChildren<{}>) {
  const totalPrice = useSelector((state: any) =>
    state.basket.items.reduce(
      (accum: Money, item: LineItem) =>
        accum.add(Money.cents(item.price).times(item.count)),
      Money.cents(0)
    )
  );

  return (
    <div {...props}>
      {props.children} ({formatMoney(totalPrice)})
    </div>
  );
}
