import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";

import Products from "../components/Products";
import Basket from "../components/Basket";
import Orders from "../components/Orders";
import BasketButton from "../components/header/Basket";

const MENU_ITEMS = {
  products: { name: "Produkty", button: null, component: Products },
  basket: { name: "Koszyk", button: BasketButton, component: Basket },
  orders: { name: "Zamówienia", button: null, component: Orders },
};

const { Content, Header } = Layout;

export default function App() {
  const dispatch = useDispatch();
  const activeMenuItemKey = useSelector(
    (state: any) => state.core.activeMenuItemKey
  );
  const navigateTo = useCallback(
    ({ key }) => dispatch({ type: "NAVIGATE_TO", menuItemKey: key }),
    [dispatch]
  );

  const ActiveComponent =
    MENU_ITEMS[activeMenuItemKey] && MENU_ITEMS[activeMenuItemKey].component;

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeMenuItemKey]}
          selectedKeys={[activeMenuItemKey]}
          onClick={navigateTo}
        >
          {Object.keys(MENU_ITEMS).map((menuItemKey) => {
            const menuItem = MENU_ITEMS[menuItemKey];
            const Button = menuItem.button || "div";
            return (
              <Menu.Item key={menuItemKey}>
                <Button>{menuItem.name}</Button>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content>{ActiveComponent && <ActiveComponent />}</Content>
    </Layout>
  );
}
