import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import dayjs from "dayjs";
import { select, takeLatest, put } from "redux-saga/effects";

import Money from "../../utils/cents";
import config from "../../config";
import { OrderTemplate } from "../../components/order/Template";

function* createOrder(action) {
  const items = (yield select((state) => state.basket.items)) as LineItem[];

  const subtotal = items.reduce(
    (sum, item) => sum.add(Money.cents(item.price).times(item.count)),
    Money.cents(0)
  );

  const order = {
    number: dayjs().format("DDMM/HHmmss"),
    createdAt: dayjs().unix(),
    brand: { id: config.id, name: config.name },
    client: action.client,
    items: (items || []).map((item) => ({
      ...item,
      total: Money.cents(item.price).times(item.count).cents,
      price: Money.cents(item.price).cents,
    })),
    summary: {
      subtotal: subtotal.cents,
      shipping: 0,
      tax: 0,
      total: subtotal.cents,
    },
  };

  const orderHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(OrderTemplate, { order, variant: "html" })
  );

  const { url } = yield axios
    .post(`/api/order`, {
      client: action.client,
      orderHtml: orderHtml,
      orderNumber: order.number,
    })
    .then((response) => response.data);

  yield put({
    type: "ORDER_CREATED",
    order: { url, timestamp: dayjs().unix(), order: JSON.stringify(order) },
  });

  yield put({ type: "CLEAR_BASKET" });

  yield put({ type: "NAVIGATE_TO", menuItemKey: "orders" });
}

export default function* watchCreateOrder() {
  yield takeLatest("CREATE_ORDER", createOrder);
}
