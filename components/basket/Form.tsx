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

export const Form: React.FC<{}> = () => {
  const { Item } = AntForm;
  return (
    <div className="tw-px-2">
      <AntForm layout="vertical" size="middle">
        <Item>
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
                <Input placeholder="Imie" />
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
                <Input placeholder="Nazwisko" />
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
            <Input.TextArea rows={4} placeholder="Ulica, 00-00, Miasto" />
          </Item>
          <Item name="addressLine2">
            <Input />
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
                <Input placeholder="Miasto" />
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
                <Input placeholder="00-00" />
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
          <Input />
        </Item>
      </AntForm>
    </div>
  );
};
