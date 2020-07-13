import React, { useState } from "react";
import { Button, Typography, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { clientIsValid } from "../utils/client";
import config from "../config";
import { Cart } from "./basket/Cart";
import { Form } from "./basket/Form";
import { Summary } from "./basket/Summary";

enum OrderStep {
  basket = 0,
  form = 1,
  confirm = 2,
}

export default function Basket() {
  const dispatch = useDispatch();
  const { Text } = Typography;

  const lastClient = useSelector((state: any) => state.orders.client) as Client;
  const lineItems = useSelector(
    (state: any) => state.basket.items
  ) as LineItem[];

  const [isBusy, setIsBusy] = useState(false);
  const [stepIndex, setStepIndex] = useState(OrderStep.basket);
  const [client, setClient] = useState<Client>(lastClient);

  const Steps = [
    {
      name: "Koszyk",
    },
    {
      name: "Dane",
      canProceed: () => clientIsValid(client),
      onLeave: () => dispatch({ type: "SAVE_CLIENT", client }),
    },
    {
      name: "Zamów",
    },
  ];

  const currentStep = Steps[stepIndex];

  const onBackClick = () => {
    setStepIndex(stepIndex - 1);
  };

  const onNextClick = () => {
    if (currentStep.onLeave) {
      currentStep.onLeave();
    }
    setStepIndex(stepIndex + 1);
  };

  const onOrder = () => {
    dispatch({ type: "CREATE_ORDER", brandId: config.id, client });
    setIsBusy(true);
  };

  const canGoBack = stepIndex == OrderStep.form;
  const isEmpty = lineItems.length === 0;
  const enableNextButton =
    !isEmpty && (currentStep.canProceed || (() => true))();

  // NOTE: no idea why but I don't care 🖕🏻
  const FUFlex = [
    [2, 3, 1],
    [2, 3, 2],
    [1, 3, 2],
  ];
  return (
    <div>
      <Row className="tw-py-2 tw-text-center" align="middle">
        <Col flex={FUFlex[stepIndex][0]}>
          <Text type="secondary">
            {stepIndex > 0 && Steps[stepIndex - 1].name}
          </Text>
        </Col>
        <Col flex={FUFlex[stepIndex][1]}>
          <Text className="tw-text-xl"> {currentStep.name}</Text>
        </Col>
        <Col flex={FUFlex[stepIndex][2]}>
          <Text type="secondary">
            {stepIndex < Steps.length - 1 && Steps[stepIndex + 1].name}
          </Text>
        </Col>
      </Row>

      {stepIndex === OrderStep.basket && <Cart items={lineItems} />}
      {stepIndex === OrderStep.form && (
        <Form client={client} onUpdate={setClient} />
      )}
      {stepIndex === OrderStep.confirm && (
        <Summary client={client} items={lineItems} onOrder={onOrder} />
      )}

      {stepIndex !== 2 && (
        <div className="tw-my-4 tw-mx-6 tw-flex tw-justify-end">
          {canGoBack && (
            <Button className="tw-mr-2" shape="round" onClick={onBackClick}>
              Wróć
            </Button>
          )}
          <Button
            type={enableNextButton ? "primary" : "default"}
            shape="round"
            disabled={isBusy || !enableNextButton}
            onClick={onNextClick}
            icon={isBusy ? <LoadingOutlined /> : null}
          >
            {isBusy ? "Wysyłanie" : "Zamów"}
          </Button>
        </div>
      )}
    </div>
  );
}
