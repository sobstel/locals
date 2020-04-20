import { useContext } from "react";
import BrandContext from "./BrandContext";
import getBrand from "./getBrand";

export default function useBrand() {
  const brandId = useContext(BrandContext);
  return getBrand(brandId);
}
