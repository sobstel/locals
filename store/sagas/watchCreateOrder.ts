import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { select, takeLatest, call, put } from "redux-saga/effects";
import getBrand from "../../config/getBrand";
import { OrderPrinter } from "../../components/order/Printer";
import Money from "../../utils/cents";

async function fetchTemplate() {
  const response = await axios.get("/data/order.template.html");
  return response.data;
}

function* createOrder(action) {
  const items = (yield select((state) => state.basket.items)) as LineItem[];
  const template = yield call(fetchTemplate);

  const brand = getBrand(action.brandId);
  // TODO: check if brand exixts and yield error if not
  const subtotal = items.reduce(
    (sum, item) => sum.add(Money.from(item.price).times(item.count)),
    Money.cents(0)
  );

  const order = {
    number: "1",
    createdAt: Date.now(),
    brand: { name: brand && brand.name },
    client: {
      firstname: "Matt",
      lastname: "Matejczyk",
      addressLine1: "Gdzieś Tam 0/Inf",
      city: "Zahoryzoncie",
      country: "PL",
      postal: "00-666",
      state: "SL",
      email: "test@test.com",
    },
    items: (items || []).map((item) => ({
      ...item,
      total: Money.from(item.price).times(item.count).cents,
      price: Money.from(item.price).cents,
    })),
    summary: {
      subtotal: subtotal.cents,
      shipping: 0,
      tax: 0,
      total: subtotal.cents,
    },
  };

  const markup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(OrderPrinter, { order })
  );

  const orderHtml = template.replace("%CONTENT%", markup);

  const { url } = yield axios
    .post(`/api/${brand && brand.id}/order`, {
      order: orderHtml,
    })
    .then((response) => response.data);

  yield put({ type: "ORDER_CREATED", order: { url } });

  yield put({ type: "CLEAR_BASKET" });

  yield put({ type: "NAVIGATE_TO", menuItemKey: "orders" });
}

export default function* watchCreateOrder() {
  yield takeLatest("CREATE_ORDER", createOrder);
}
