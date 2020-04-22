import React from "react";
import { Button } from "antd";
import { Cart } from "./Cart";

const ClientInfo: React.FC<{ client: Client }> = ({ client }) => (
  <div className="tw-p-2 tw-text-right tw-bg-white">
    <div className="tw-font-semibold tw-mb-1">
      {client.firstname} {client.lastname}
    </div>
    <div className="tw-text-gray-800">
      <span>{client.addressLine1}</span>
      {client.addressLine2 && <div>{client.addressLine2}</div>}
    </div>
    <div className="tw-text-gray-800">
      {client.city}, {client.postal}
    </div>
  </div>
);

export const Summary: React.FC<{
  items: LineItem[];
  client?: Client;
  onOrder: () => void;
}> = ({ items, client, onOrder }) => {
  return (
    <div>
      <ClientInfo client={client} />
      <Cart items={items} />
      <div className="tw-my-4 tw-mx-6 tw-flex tw-justify-center">
        <Button type="primary" shape="round" onClick={() => onOrder()}>
          Zamów
        </Button>
      </div>
    </div>
  );
};
