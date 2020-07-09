type Brand = {
  id?: string;
  name: string;
  address: Address;
  spreadsheet: {
    id: string;
    range: string;
  };
  public?: false;
};

type Product = { name: string; price: number };

type ProductsGroup = {
  name: string;
  products: Product[];
};

type GroupedProducts = ProductsGroup[];

type LineItem = { name: string; price: number; count: number };

type OrderItem = LineItem;

type OrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

type Address = {
  addressLine1: string;
  addressLine2?: string;
  postal: string;
  city: string;
  state: string;
  country: string;
};

type Client = {
  firstname: string;
  lastname: string;
  email: string;
  delivery: "postal" | "pickup";
  phone?: string;
  address: Address;
};

type Order = {
  number: string;
  createdAt: number;
  client: Client;
  items: OrderItem[];
  summary: OrderSummary;
};
