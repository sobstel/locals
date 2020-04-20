type Product = { name: string; price: number };

type ProductsGroup = {
  name: string;
  products: Product[];
};

type GroupedProducts = ProductsGroup[];

type LineItem = { name: string; price: number; count: number };

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
  items: { name: string; price: number; count: number; total: number }[];
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
};
