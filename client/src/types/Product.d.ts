export interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  quantity: number;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}

export interface ProductDto {
  name: string;
  article: string;
  price: string;
  quantity: string;
}