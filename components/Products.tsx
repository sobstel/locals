import * as R from "remeda";
import { useEffect } from "react";
import { Collapse, List } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./shared/Loading";

const { Panel } = Collapse;

export default function Products() {
  const dispatch = useDispatch();
  const groupedProducts: GroupedProducts = useSelector(
    (state) => state.products.groupedProducts
  );
  const loading = useSelector((state) => state.loading.fetchProducts);

  useEffect(() => {
    // TODO: how to reload products? as they remembered by redux-persist
    if (!groupedProducts || groupedProducts.length === 0) {
      dispatch({ type: "FETCH_PRODUCTS" });
    }
  }, [dispatch]);

  if (loading) {
    return <Loading message="Trwa ładowanie produktów..." />;
  }

  if (!groupedProducts || groupedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <Collapse accordion defaultActiveKey={groupedProducts[0].name}>
        {groupedProducts.map((group) => (
          <Panel
            key={group.name}
            header={group.name}
            className="tw-bg-gray-200"
          >
            <List
              dataSource={group.products}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <PlusCircleTwoTone key="add" className="tw-text-xl" />,
                  ]}
                >
                  <List.Item.Meta title={item.name} />
                  <div>{item.price.toFixed(2)} zł</div>
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
