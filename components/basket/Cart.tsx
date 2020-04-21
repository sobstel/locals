import React from "react";
import { Table, Typography } from "antd";
import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";

type TableDataItem = LineItem & {
  total: Money;
};

const TableColumns = [
  {
    title: "Product",
    dataIndex: "name",
    key: "$name",
  },
  {
    title: "Wartość",
    dataIndex: "summary",
    key: "$summary",
    align: "right",
    render: (_, record) => (
      <div>
        <small>{record.count}&nbsp;x&nbsp;</small>
        {formatMoney(record.price)}
      </div>
    ),
  },
];

const TableSummary: React.FC<{ data: TableDataItem[] }> = ({ data }) => {
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
    <tr key="footer">
      <th>Podsumowanie</th>
      <td className="tw-text-right">
        <Text strong>{formatMoney(sum.total)}</Text>
      </td>
    </tr>
  );
};

export const Cart: React.FC<{ items: LineItem[] }> = ({ items }) => {
  const dataSource = (items || []).map((item) => {
    const price = Money.from(item.price);
    const total = price.times(item.count);
    return {
      ...item,
      total,
    } as TableDataItem;
  });

  return (
    <Table
      dataSource={dataSource}
      columns={TableColumns as unknown[]}
      pagination={false}
      rowKey={(record) => record.name}
      summary={(pageData) => {
        if (!pageData.length) {
          return null;
        }
        return <TableSummary data={pageData} />;
      }}
    />
  );
};
