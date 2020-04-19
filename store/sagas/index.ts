import { all } from "redux-saga/effects";

import watchFetchProducts from "./watchFetchProducts";

export default function* () {
  yield all([watchFetchProducts()]);
}
