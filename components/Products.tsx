import { useEffect } from "react";
import { Collapse, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import Loading from "./shared/Loading";
import Product from "./products/Product";

const { Panel } = Collapse;

export default function Products() {
  const dispatch = useDispatch();
  const groupedProducts: GroupedProducts = useSelector(
    (state: any) => state.products.groupedProducts
  );
  const loading = useSelector((state: any) => state.loading.fetchProducts);

  useEffect(() => {
    // TODO: how to reload products? as they remembered by redux-persist
    if (!groupedProducts || groupedProducts.length === 0) {
      dispatch({ type: "FETCH_PRODUCTS" });
    }
  }, [dispatch]);

  // TODO: how to useCallback for a loop?
  const modifyBasket = (product: Product, op: string) =>
    dispatch({ type: "MODIFY_BASKET", product, op });

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
                <Product
                  id={item.name}
                  onClick={(product, op) => modifyBasket(product, op)}
                />
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
