import { Alert, Button } from "antd";
import axios from "axios";
import { getBrand } from "../config/getBrand";

export default function Basket() {
  const onPublishClick = () => {
    const brand = getBrand();
    axios.post(`/api/${brand.id}/order`).then((data) => console.log(data));
  };

  return (
    <div>
      <Alert message="TO DO" type="error" />
      <Button onClick={onPublishClick}>Test</Button>
    </div>
  );
}
