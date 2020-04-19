import brands from "./brands";

export function getBrand(id: string | undefined = undefined) {
  let brandId = id;
  if (!brandId) {
    if (!process.browser) throw new Error("Browser only");
    // SMELL: very hackish
    brandId = window.location.pathname.slice(1);
  }

  if (!brands[brandId]) throw new Error(`Brand ${brandId} not found`);

  return { ...brands[brandId], id: brandId };
}
