import { Product } from '../product.entity';

export interface ProductResponse {
	status: number;
	message: string;
	data: Product;
}
