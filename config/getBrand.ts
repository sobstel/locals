import brands from "./brands";

export default function getBrand(id: string) {
  if (!brands[id]) return false;
  return { ...brands[id], id };
}
