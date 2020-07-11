import React from "react";
import { Col, Row, Form as AntForm, Input } from "antd";
import config from "../../config";

const DefaultClient: Client = {
  firstname: "",
  lastname: "",
  address: {
    addressLine1: "",
    postal: "",
    city: "",
    state: "",
    country: "PL",
  },
  delivery: "postal",
  phone: "",
  email: "",
};

export const Form: React.FC<{
  client?: Client;
  onUpdate?: (client: Client) => void;
}> = (props) => {
  const { Item } = AntForm;

  const client = { ...DefaultClient, ...(props.client || {}) };

  const updateClient = (field: string, value: string) => {
    const path = field.split(".");
    let obj = client;
    while (path.length > 1) {
      obj = obj[path.shift()];
    }
    obj[path.shift()] = value;
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
                    message: "Pole imie jest wymagane",
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
                    message: "Pole nazwisko jest wymagane",
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

        {config.address && (
          <Item>
            <Item
              name="addressLine1"
              label="Adres"
              rules={[
                {
                  required: true,
                  message: "Prosze podać adres",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea
                {...commonInputProps}
                rows={2}
                placeholder="ul. Przykładowa 26/21"
                onChange={onInputChange("address.addressLine1")}
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
                      message: "Prosze podać miasto",
                    },
                  ]}
                >
                  <Input
                    {...commonInputProps}
                    placeholder="Miasto"
                    onChange={onInputChange("address.city")}
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
                      message: "Prosze podaj kod pocztowy",
                    },
                  ]}
                >
                  <Input
                    {...commonInputProps}
                    placeholder="00-00"
                    onChange={onInputChange("address.postal")}
                  />
                </Item>
              </Col>
            </Row>
          </Item>
        )}

        <Item
          name="phone"
          label="Telefon"
          rules={[
            {
              type: "phone",
              message: "To nie wygląda na poprawny telefon",
            },
            {
              required: true,
              message: "Telefon jest nam potrzebny",
            },
          ]}
        >
          <Input {...commonInputProps} onChange={onInputChange("phone")} />
        </Item>

        <Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "To nie wygląda na poprawny email",
            },
            {
              required: true,
              message: "Email jest nam potrzebny",
            },
          ]}
        >
          <Input {...commonInputProps} onChange={onInputChange("email")} />
        </Item>
      </AntForm>
    </div>
  );
};
