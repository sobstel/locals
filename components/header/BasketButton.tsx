import React from "react";
import { useSelector } from "react-redux";

export default function BasketButton(props: React.PropsWithChildren<{}>) {
  const totalPrice = useSelector((state: any) =>
    state.basket.items.reduce(
      (accum, item) => accum + item.count * item.price,
      0
    )
  );

  return (
    <div {...props}>
      {props.children} ({totalPrice.toFixed(2)} zł)
    </div>
  );
}
