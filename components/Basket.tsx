import { Button, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useBrand from "../config/useBrand";

export default function Basket() {
  const dispatch = useDispatch();
  const brand = useBrand();

  const onPublishClick = () => {
    dispatch({ type: "CREATE_ORDER", brandId: brand.id });
  };

  const items = useSelector((state: any) => state.basket.items);

  const dataSource = (items || []).map((item) => ({
    ...item,
    total: `${(item.price * item.count).toFixed(2)} zł`,
    price: `${item.price.toFixed(2)} zł`,
  }));

  const columns = [
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
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Wartość",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button type="primary" onClick={onPublishClick}>
        Zamów
      </Button>
    </div>
  );
}
