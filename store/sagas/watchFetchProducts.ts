import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// TODO: handle errors
async function callService(id) {
  const response = await axios.get(`/api/${id}/products`);
  return response.data;
}

function* fetchProducts(action) {
  yield put({ type: "START_LOADING", name: "fetchProducts" });
  const groupedProducts = yield call(callService, [action.id]);
  yield put({ type: "PRODUCTS_FETCHED", groupedProducts });
  yield put({ type: "STOP_LOADING", name: "fetchProducts" });
}

export default function* watchFetchProducts() {
  yield takeLatest("FETCH_PRODUCTS", fetchProducts);
}
