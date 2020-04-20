import { List } from "antd";
import { useSelector, useDispatch } from "react-redux";

export default function Basket() {
  const dispatch = useDispatch();

  const orders = useSelector((state: any) => state.orders.items) as {
    url: string;
  }[];

  return (
    <div>
      <List
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <a href={order.url} target="_blank" rel="noopener noreferrer">
              {order.url}
            </a>
          </List.Item>
        )}
      />
    </div>
  );
}
