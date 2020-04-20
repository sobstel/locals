import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";

export default function BasketButton(props: React.PropsWithChildren<{}>) {
  const basketSize = useSelector((state: any) =>
    state.basket.items.reduce((accum, item) => accum + item.count, 0)
  );
  return (
    <Badge count={basketSize}>
      <div>{props.children}</div>
    </Badge>
  );
}
