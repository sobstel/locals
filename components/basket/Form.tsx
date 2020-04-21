import React from "react";
import { Col, Row, Form as AntForm, Input } from "antd";

const DefaultClient: Client = {
  firstname: "",
  lastname: "",
  addressLine1: "",
  postal: "",
  city: "",
  state: "",
  country: "PL",
  email: "",
};

export const Form: React.FC<{
  client?: Client;
  onUpdate?: (client: Client) => void;
}> = (props) => {
  const { Item } = AntForm;

  const client = { ...DefaultClient, ...(props.client || {}) };

  const updateClient = (field: string, value: string) => {
    client[field] = value;
    props.onUpdate(client);
  };

  const onInputChange = <T extends Element & { value: string }>(
    field: string
  ) => (e: React.ChangeEvent<T>) => updateClient(field, e.target.value);

  const commonInputProps = { disabled: typeof props.onUpdate !== "function" };

  return (
    <div className="tw-px-2 tw-pt-3 tw-pb-1 tw-bg-white">
      <AntForm layout="vertical" size="middle" initialValues={client}>
        <Item label="Imię i nazwisko" required>
          <Row gutter={8}>
            <Col span={12}>
              <Item
                name="firstname"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input
                  {...commonInputProps}
                  placeholder="Przemek"
                  onChange={onInputChange("firstname")}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="lastname"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input
                  {...commonInputProps}
                  placeholder="Przykładowy"
                  onChange={onInputChange("lastname")}
                />
              </Item>
            </Col>
          </Row>
        </Item>

        <Item>
          <Item
            name="addressLine1"
            label="Adres dostawy"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea
              {...commonInputProps}
              rows={2}
              placeholder="ul. Przykładowa 26/21"
              onChange={onInputChange("addressLine1")}
            />
          </Item>
          <Row gutter={8}>
            <Col span={16}>
              <Item
                name="city"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input
                  {...commonInputProps}
                  placeholder="Miasto"
                  onChange={onInputChange("city")}
                />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                name="postal"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input
                  {...commonInputProps}
                  placeholder="00-00"
                  onChange={onInputChange("postal")}
                />
              </Item>
            </Col>
          </Row>
        </Item>

        <Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input {...commonInputProps} onChange={onInputChange("email")} />
        </Item>
      </AntForm>
    </div>
  );
};
