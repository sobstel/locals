import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../store/configureStore";

import App from "../components/App";

const { store, persistor } = configureStore();

export default () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </div>
  );
};
