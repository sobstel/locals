import React from "react";
import { Button } from "antd";
import { Cart } from "./Cart";

const ClientInfo: React.FC<{ client: Client }> = ({ client }) => (
  <div className="tw-p-2 tw-text-right">
    <div className="tw-font-bold tw-mb-1">
      {client.firstname} {client.lastname}
    </div>
    <div className="tw-text-gray-800">
      <span>{client.addressLine1}</span>
      {client.addressLine1 && <div>{client.addressLine1}</div>}
    </div>
    <div className="tw-text-gray-800">
      {client.city}, {client.postal}
    </div>
  </div>
);

export const Summary: React.FC<{ items: LineItem[]; client?: Client }> = ({
  items,
  client,
}) => {
  return (
    <div>
      <ClientInfo client={client} />
      <Cart items={items} />
      <div className="tw-my-4 tw-mx-6 tw-flex tw-justify-center">
        <Button type="primary" shape="round">
          Zamów
        </Button>
      </div>
    </div>
  );
};
