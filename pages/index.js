import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Collapse, Divider, Layout, List, Skeleton } from "antd";

const { Content } = Layout;
const { Panel } = Collapse;

// import { Form, Select, InputNumber, Switch, Slider, Button } from "antd";

// const FormItem = Form.Item;
// const Option = Select.Option;

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/products");
      setData(result.data);
    }
    fetchData();
  }, []);

  if (data) {
  }

  return (
    <div>
      <Layout style={{ width: 800, margin: "10px auto" }}>
        <Content>
          {data.length == 0 && (
            <Alert message="Ładowanie produktów..." type="warning" />
          )}
          {data.length > 0 && (
            <Collapse defaultActiveKey={[data[0].name]}>
              {data.map((group) => (
                <Panel key={group.name} header={group.name}>
                  <List
                    dataSource={group.products}
                    renderItem={(item) => (
                      <List.Item>
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
