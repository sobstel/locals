import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = compose(applyMiddleware(sagaMiddleware));

export default (brandId: string) => {
  const persistedReducer = persistReducer(
    { key: brandId, storage, blacklist: [] },
    rootReducer
  );
  const store = createStore(persistedReducer, middlewares);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};
