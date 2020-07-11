import React from "react";
import { Button } from "antd";
import config from "../../config";
import { Cart } from "./Cart";

const ClientInfo: React.FC<{ client: Client }> = ({ client }) => (
  <div className="tw-p-2 tw-text-right tw-bg-white">
    <div className="tw-font-semibold tw-mb-1">
      {client.firstname} {client.lastname}
      <br />
      tel. {client.phone}
    </div>
    {config.address && (
      <>
        <div className="tw-text-gray-800">
          <span>{client.address.addressLine1}</span>
          {client.address.addressLine2 && (
            <div>{client.address.addressLine2}</div>
          )}
        </div>
        <div className="tw-text-gray-800">
          {client.address.city}, {client.address.postal}
        </div>
      </>
    )}
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
