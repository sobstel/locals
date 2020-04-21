import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MakeStoreOptions } from "next-redux-wrapper";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export default function makeStore(
  initialState,
  { isServer }: MakeStoreOptions
) {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = composeEnhancers(applyMiddleware(sagaMiddleware));

  store = createStore(rootReducer, initialState, middlewares);

  if (!isServer) {
    // SMELL: hack to get a brand id
    const key = window.location.pathname.slice(1).replace(/\/$/, "");

    if (key) {
      const persistedReducer = persistReducer(
        { key, storage, whitelist: ["basket", "orders"] },
        rootReducer
      );

      store = createStore(persistedReducer, initialState, middlewares);
      persistStore(store);
    }
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
