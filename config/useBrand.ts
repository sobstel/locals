import { useContext } from "react";
import BrandContext from "./BrandContext";
import getBrand from "./getBrand";

export default function useBrand(): Brand {
  const brandId = useContext(BrandContext);
  const brand = getBrand(brandId);
  if (!brand) throw new Error("brandId must be valid");
  return brand;
}
