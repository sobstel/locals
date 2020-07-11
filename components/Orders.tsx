import { List, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";

import Money from "../utils/cents";
import { formatMoney } from "../utils/accounting";
import { OrderTemplate } from "./order/Template";

export default function Basket() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const placedOrders = useSelector(
    (state: any) => state.orders.items
  ) as PlacedOrder[];

  return (
    <div>
      {selectedOrder ? (
        <div>
          <Button onClick={() => setSelectedOrder(null)}>Powrót</Button>
          <OrderTemplate order={selectedOrder} />
        </div>
      ) : (
        <List
          dataSource={placedOrders}
          renderItem={(placedOrder) => {
            const order = JSON.parse(placedOrder.order) as Order;
            return (
              <List.Item>
                {dayjs.unix(order.createdAt).format("DD-MM-YYYY HH:mm")} -{" "}
                {formatMoney(Money.cents(order.summary.total))}
                <Button onClick={() => setSelectedOrder(order)}>Podgląd</Button>
                <a
                  href={placedOrder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {placedOrder.url}
                </a>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
}
