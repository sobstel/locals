import { all } from "redux-saga/effects";

import watchFetchProducts from "./watchFetchProducts";
import watchCreateOrder from "./watchCreateOrder";

export default function* () {
  yield all([watchFetchProducts(), watchCreateOrder()]);
}
