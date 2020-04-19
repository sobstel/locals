import storage from "redux-persist/lib/storage";
import { getBrand } from "./getBrand";

function prepareKey(key: string) {
  const brand = getBrand();
  return `${key}:${brand.id}`;
}

function createBrandStorage() {
  return {
    getItem: (key: string) => storage.getItem(prepareKey(key)),
    setItem: (key: string, item: string) =>
      storage.setItem(prepareKey(key), item),
    removeItem: (key: string) => storage.removeItem(prepareKey(key)),
  };
}

export default createBrandStorage();
