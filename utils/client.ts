// TODO: create a better validation :)

export const addressIsValid = (address: Address) => {
  return address && address.addressLine1 && address.city && address.postal;
};

export const clientIsValid = (client: Client) => {
  return (
    client &&
    client.firstname &&
    client.lastname &&
    client.email &&
    addressIsValid(client.address)
  );
};
