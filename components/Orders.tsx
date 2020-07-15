import { Table, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";

import Money from "../utils/cents";
import { formatMoney } from "../utils/accounting";
import { OrderTemplate } from "./order/Template";

const getOrder = (placedOrder: PlacedOrder) =>
  JSON.parse(placedOrder.order) as Order;

export default function Basket() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  let placedOrders = useSelector(
    (state: any) => state.orders.items
  ) as PlacedOrder[];
  placedOrders = [...(placedOrders || [])].sort(
    (order1, order2) => order2.timestamp - order1.timestamp
  );

  const TableColumns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "$date",
      align: "left",
      render: (_, record) => (
        <Typography.Text type="secondary">
          {dayjs.unix(record.timestamp).format("DD/MM/YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: "Zamówienie",
      dataIndex: "name",
      key: "$name",
      render: (_, record) => (
        <Typography.Text strong copyable>
          {getOrder(record).number}
        </Typography.Text>
      ),
    },
    {
      title: "Wartość",
      dataIndex: "summary",
      key: "$summary",
      align: "right",
      render: (_, record) => (
        <div>{formatMoney(Money.cents(getOrder(record).summary.subtotal))}</div>
      ),
    },
    {
      title: "",
      dataIndex: "preview",
      key: "$preview",
      align: "right",
      render: (_, record) => (
        <Button
          type="ghost"
          shape="round"
          onClick={() => setSelectedOrder(getOrder(record))}
        >
          Podgląd
        </Button>
      ),
    },
  ];

  return (
    <div>
      {selectedOrder ? (
        <div>
          <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => setSelectedOrder(null)}
          >
            Powrót
          </Button>
          <OrderTemplate order={selectedOrder} variant="node" />
        </div>
      ) : (
        <Table
          dataSource={placedOrders}
          columns={TableColumns as unknown[]}
          pagination={false}
          rowKey={(record) => record.timestamp}
        />
      )}
    </div>
  );
}
