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

type Order = {
  number: string;
  createdAt: number;
  brand: {
    name: string;
  };
  client: {
    firstname: string;
    lastname: string;
    addressLine1: string;
    addressLine2?: string;
    postal: string;
    city: string;
    state: string;
    country: string;
  };
  items: OrderItem[];
  summary: OrderSummary;
};
