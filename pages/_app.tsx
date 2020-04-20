import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import makeStore from "../store/makeStore";

import "../tailwind.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(makeStore)(MyApp);
