type Product = { name: string; price: number };

type ProductsGroup = {
  name: string;
  products: Product[];
};

type GroupedProducts = ProductsGroup[];

type LineItem = { name: string; price: number; count: number };
