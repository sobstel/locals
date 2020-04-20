import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { select, takeLatest, call, put } from "redux-saga/effects";
import { getBrand } from "../../config/getBrand";
import { OrderPrinter } from "../../components/order/Printer";

async function fetchTemplate() {
  const response = await axios.get("/data/order.template.html");
  return response.data;
}

function* createOrdert() {
  const items = yield select((state) => state.basket.items);
  const template = yield call(fetchTemplate);

  const brand = getBrand();
  const subtotal = items
    .reduce((sum, item) => sum + item.count * item.price, 0)
    .toFixed(2);

  const order = {
    number: "1",
    createdAt: Date.now(),
    brand: { name: brand.name },
    client: {
      firstname: "Matt",
      lastname: "Matejczyk",
      addressLine1: "Gdzieś Tam 0/Inf",
      city: "Zahoryzoncie",
      country: "PL",
      postal: "00-666",
      state: "SL",
    },
    items: (items || []).map((item) => ({
      ...item,
      total: `${(item.price * item.count).toFixed(2)} zł`,
      price: `${item.price.toFixed(2)} zł`,
    })),
    summary: {
      subtotal: subtotal,
      shipping: 0,
      tax: 0,
      total: subtotal,
    },
  };

  const markup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(OrderPrinter, { order })
  );

  const orderHtml = template.replace("%CONTENT%", markup);

  const { url } = yield axios
    .post(`/api/${brand.id}/order`, {
      order: orderHtml,
    })
    .then((response) => response.data);

  yield put({ type: "ORDER_CREATED", order: { url } });

  yield put({ type: "CLEAR_BASKET" });

  yield put({ type: "NAVIGATE_TO", menuItemKey: "orders" });
}

export default function* watchCreateOrder() {
  yield takeLatest("CREATE_ORDER", createOrdert);
}
