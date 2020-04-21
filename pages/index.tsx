import { Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import brands from "../config/brands";

const { Text } = Typography;

const publicBrandIds = Object.keys(brands).filter(
  (id) => brands[id].public !== false
);

export default () => {
  return (
    <div className="tw-my-8 tw-text-center">
      <div>
        <ShoppingCartOutlined className="tw-text-5xl" />
      </div>

      <div className="tw-my-4">
        <Text className="tw-font-medium">
          Formularz zamówienia dla małych lokalnych sklepów
        </Text>
      </div>

      <div className="tw-my-4">
        {publicBrandIds.map((brandId) => (
          <div key={brandId}>
            <Text>
              <a href={`/${brandId}`}>{brandId}</a>
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
