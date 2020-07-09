import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import config from "../config";

import Products from "../components/Products";
import Basket from "../components/Basket";
import Orders from "../components/Orders";
import BasketButton from "../components/header/BasketButton";

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

  const MENU_ITEMS = {
    products: {
      name: config.name,
      button: null,
      component: Products,
    },
    basket: {
      name: "Koszyk",
      button: BasketButton,
      component: Basket,
    },
    orders: {
      name: "Zamówienia",
      button: null,
      component: Orders,
      hidden: true,
    },
  };

  const ActiveComponent =
    MENU_ITEMS[activeMenuItemKey] && MENU_ITEMS[activeMenuItemKey].component;

  return (
    <Layout>
      <Header className="tw-sticky tw-top-0 tw-px-0 tw-z-10">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeMenuItemKey]}
          selectedKeys={[activeMenuItemKey]}
          onClick={navigateTo}
        >
          {Object.keys(MENU_ITEMS).map((menuItemKey) => {
            const menuItem = MENU_ITEMS[menuItemKey];
            if (menuItem.hidden) return null;
            const Button = menuItem.button || "div";
            return (
              <Menu.Item key={menuItemKey}>
                <Button className="tw-font-semibold">{menuItem.name}</Button>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content>{ActiveComponent && <ActiveComponent />}</Content>
    </Layout>
  );
}
