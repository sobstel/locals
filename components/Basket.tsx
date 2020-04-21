import React, { useState } from "react";
import { Button, Typography, Row, Col } from "antd";

import { useSelector, useDispatch } from "react-redux";
import useBrand from "../config/useBrand";

import { Cart } from "./basket/Cart";
import { Form } from "./basket/Form";

enum OrderStep {
  basket = 0,
  form = 1,
  payment = 2,
  ready = 3,
}

const Steps = [
  { name: "Koszyk" },
  { name: "Dane" },
  { name: "Płatność" },
  { name: "Gotowe" },
];

export default function Basket() {
  const dispatch = useDispatch();

  const [currentStep, setStep] = useState(OrderStep.basket);

  const brand = useBrand();

  const onBackClick = () => setStep(currentStep - 1);
  const onPublishClick = () => {
    // dispatch({ type: "CREATE_ORDER", id: brand.id });
    setStep(currentStep + 1);
  };

  const lineItems = useSelector(
    (state: any) => state.basket.items
  ) as LineItem[];

  const canGoBack = currentStep > 0;
  const isEmpty = lineItems.length === 0;

  const { Text } = Typography;

  return (
    <div>
      <Row className="tw-py-2 tw-text-center" align="middle">
        <Col flex={1}>
          <Text type="secondary">
            {currentStep > 0 && Steps[currentStep - 1].name}
          </Text>
        </Col>
        <Col flex={3}>
          <Text className="tw-text-xl"> {Steps[currentStep].name}</Text>
        </Col>
        <Col flex={1}>
          <Text type="secondary">
            {currentStep < Steps.length && Steps[currentStep + 1].name}
          </Text>
        </Col>
      </Row>

      {currentStep == 0 && <Cart items={lineItems} />}

      {currentStep == 1 && <Form />}

      <div className="tw-my-4 tw-mx-6 tw-flex tw-justify-end">
        {canGoBack && (
          <Button className="tw-mr-2" shape="round" onClick={onBackClick}>
            Wróć
          </Button>
        )}
        <Button
          type="primary"
          shape="round"
          disabled={isEmpty}
          onClick={onPublishClick}
        >
          Zamów
        </Button>
      </div>
    </div>
  );
}
