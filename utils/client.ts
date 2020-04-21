// TODO: create a better validation :)

export const clientIsValid = (client: Client) => {
  return (
    client &&
    client.firstname &&
    client.lastname &&
    client.addressLine1 &&
    client.city &&
    client.postal &&
    client.email
  );
};
