import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";

import Products from "../components/Products";
import Basket from "../components/Basket";

const MENU_ITEMS = {
  products: { name: "Produkty", component: Products },
  basket: { name: "Koszyk", component: Basket },
};

const { Content, Header } = Layout;

export default function App() {
  const dispatch = useDispatch();
  const activeMenuItemKey = useSelector(
    (state) => state.core.activeMenuItemKey
  );
  const navigateTo = useCallback(
    ({ key }) => dispatch({ type: "NAVIGATE_TO", menuItemKey: key }),
    [dispatch]
  );

  const ActiveComponent =
    MENU_ITEMS[activeMenuItemKey] && MENU_ITEMS[activeMenuItemKey].component;

  return (
    <Layout className="tw-max-w-2xl tw-m-auto">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeMenuItemKey]}
          onClick={navigateTo}
        >
          {Object.keys(MENU_ITEMS).map((menuItemKey) => {
            const menuItem = MENU_ITEMS[menuItemKey];
            return <Menu.Item key={menuItemKey}>{menuItem.name}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content>
        <ActiveComponent />
      </Content>
    </Layout>
  );
}
