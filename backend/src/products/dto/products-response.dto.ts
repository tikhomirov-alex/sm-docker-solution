import { Product } from '../product.entity';

export interface ProductsResponse {
	data: Product[];
	total: number;
}
