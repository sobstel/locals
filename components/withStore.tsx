import { Provider } from "react-redux";
import { FunctionComponent } from "react";
import configureStore from "../store/configureStore";

const { store } = configureStore();

export default function withStore(Component: FunctionComponent) {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}
