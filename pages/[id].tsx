import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../store/configureStore";
import { BrandProvider } from "../BrandContext";

import App from "../components/App";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const brandId = id as string;

  if (!brandId) return null;

  const { store, persistor } = configureStore(brandId);

  return (
    <div>
      <BrandProvider value={brandId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrandProvider>
    </div>
  );
};
