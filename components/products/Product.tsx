import { Button, List } from "antd";
import { useSelector } from "react-redux";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";

export default function Product(props: {
  id: string;
  onClick: (item: Product, op: "add" | "remove") => void;
}) {
  const { id, onClick } = props;

  const product = useSelector((state: any) => {
    const groupedProducts = state.products.groupedProducts as ProductsGroup[];
    for (const group of groupedProducts) {
      const product = group.products.find((product) => product.name === id);
      if (product) {
        return product;
      }
    }
    return null;
  });

  const lineItem = useSelector((state: any) => {
    const lineItems = (state.basket.items || []) as LineItem[];
    return lineItems.find((item) => item.name === id);
  });

  const inBasket = lineItem != null;

  return (
    <List.Item
      actions={[
        inBasket ? (
          <Button
            key="add"
            type="primary"
            shape="circle"
            size="large"
            icon={<MinusOutlined />}
            onClick={() => onClick(product, "remove")}
          />
        ) : undefined,
        <Button
          key="add"
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => onClick(product, "add")}
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <div className={`tw-clearfix ${inBasket ? "tw-font-semibold" : ""}`}>
            <div className="tw-float-left">{product.name}</div>
            <div className="tw-float-right">
              {inBasket && <span className="tw-mr-1">{lineItem.count} x</span>}
              <span>{formatMoney(Money.from(product.price))}</span>
            </div>
          </div>
        }
      />
    </List.Item>
  );
}
