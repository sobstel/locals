import { Alert } from "antd";
import { SmileOutlined } from "@ant-design/icons";

type Props = { message: string };

export default function Loading({ message }: Props) {
  return (
    <Alert
      type="warning"
      message={message}
      showIcon
      icon={<SmileOutlined spin />}
    />
  );
}
