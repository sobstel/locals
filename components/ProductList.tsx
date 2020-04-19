import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Collapse, List, Skeleton } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;

export default function ProductList() {
  const [data, setData]: [GroupedProducts, Function] = useState([]);

  // TODO: move to saga
  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/products");
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.length == 0 && (
        <Alert message="Ładowanie produktów..." type="warning" />
      )}
      {data.length > 0 && (
        <Collapse accordion defaultActiveKey={[data[0].name]}>
          {data.map((group) => (
            <Panel key={group.name} header={group.name}>
              <List
                dataSource={group.products}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <PlusCircleTwoTone key="add" style={{ fontSize: 16 }} />,
                    ]}
                  >
                    <Skeleton title={false} loading={false}>
                      <List.Item.Meta title={item.name} />
                      <div>{item.price.toFixed(2)} zł</div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
}
