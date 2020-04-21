import React, { useState } from "react";
import { Button, Table, Typography, Steps } from "antd";

import { useSelector, useDispatch } from "react-redux";
import useBrand from "../config/useBrand";
import Money from "../utils/cents";
import { formatMoney } from "../utils/accounting";

enum OrderStep {
  basket = 0,
  form = 1,
  payment = 2,
  ready = 3,
}

type TableDataItem = LineItem & {
  total: Money;
  priceStr: string;
  totalStr: string;
};

const TableColumns = [
  {
    title: "Nazwa",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ilość",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Cena jd.",
    dataIndex: "priceStr",
    key: "priceStr",
  },
  {
    title: "Wartość",
    dataIndex: "totalStr",
    key: "totalStr",
  },
];

const Summary: React.FC<{ data: TableDataItem[] }> = ({ data }) => {
  const { Text } = Typography;

  const sum = data.reduce(
    (accum, item) => {
      accum.count = accum.count + item.count;
      accum.total = accum.total.add(item.total);
      return accum;
    },
    {
      count: 0,
      total: Money.cents(0),
    }
  );

  return (
    <tr>
      <th>Podsumowanie</th>
      <td>
        <Text strong>{sum.count}</Text>
      </td>
      <td></td>
      <td>
        <Text strong>{formatMoney(sum.total)}</Text>
      </td>
    </tr>
  );
};

export default function Basket() {
  const dispatch = useDispatch();
  const [currentStep, setStep] = useState(OrderStep.basket);
  const brand = useBrand();
  const onPublishClick = () => {
    // dispatch({ type: "CREATE_ORDER", id: brand.id });
    setStep(currentStep + 1);
  };

  const lineItems = useSelector(
    (state: any) => state.basket.items
  ) as LineItem[];

  const isEmpty = lineItems.length === 0;

  const dataSource = (lineItems || []).map((item) => {
    const price = Money.from(item.price);
    const total = price.times(item.count);
    console.log(price, item.price, item.count, total);
    return {
      ...item,
      total,
      priceStr: formatMoney(price),
      totalStr: formatMoney(total),
    } as TableDataItem;
  });

  const { Step } = Steps;

  return (
    <div className="tw-pt-2">
      <Steps current={currentStep} progressDot={(dot) => dot} size="small">
        <Step title="Koszyk" />
        <Step title="Dane" />
        <Step title="Płatność" />
        <Step title="Gotowe" />
      </Steps>
      <Table
        dataSource={dataSource}
        columns={TableColumns}
        pagination={false}
        summary={(pageData) => {
          if (isEmpty) {
            return null;
          }
          return <Summary data={pageData} />;
        }}
      />
      <div className="tw-my-4 tw-mx-6 tw-flex tw-justify-end">
        <Button type="primary" disabled={isEmpty} onClick={onPublishClick}>
          Zamów
        </Button>
      </div>
    </div>
  );
}
