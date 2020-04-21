import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import makeStore from "../store/makeStore";

import "antd/dist/antd.css";
import "../styles.css";

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <div className="tw-mx-auto tw-max-w-2xl">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default withRedux(makeStore)(MyApp);
