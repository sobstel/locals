import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Collapse, Layout, List, Menu, Skeleton } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";

const { Content, Header } = Layout;
const { Panel } = Collapse;

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/products");
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Layout style={{ maxWidth: 800, margin: "auto" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Produkty</Menu.Item>
            <Menu.Item key="2">Koszyk</Menu.Item>
          </Menu>
        </Header>
        <Content>
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
                          <PlusCircleTwoTone
                            key="add"
                            style={{ fontSize: 16 }}
                          />,
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
        </Content>
      </Layout>
    </div>
  );
};
