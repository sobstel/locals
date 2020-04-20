import Error from "next/error";
import App from "../components/App";
import { BrandProvider } from "../config/BrandContext";
import getBrand from "../config/getBrand";

export default function (props) {
  const brand = getBrand(props.id);
  if (!brand) return <Error statusCode={404} />;

  return (
    <BrandProvider value={brand.id}>
      <App />
    </BrandProvider>
  );
}

export function getServerSideProps(context) {
  return { props: { id: context.params.id } };
}
