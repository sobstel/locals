import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";

import brandStorage from "../config/brandStorage";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = compose(applyMiddleware(sagaMiddleware));

export default () => {
  const persistedReducer = persistReducer(
    { key: "locals", storage: brandStorage, blacklist: [] },
    rootReducer
  );
  const store = createStore(persistedReducer, middlewares);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};
