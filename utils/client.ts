// TODO: create a better validation :) (or maybe it's good enough, huh?)

import config from "../config";

export const addressIsValid = (address: Address) => {
  if (!config.address) {
    return true;
  }
  return address && address.addressLine1 && address.city && address.postal;
};

export const clientIsValid = (client: Client) => {
  return (
    client &&
    client.firstname &&
    client.lastname &&
    client.email &&
    client.phone &&
    addressIsValid(client.address)
  );
};
