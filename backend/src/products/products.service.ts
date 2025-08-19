import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductsResponse } from './dto/products-response.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) {}

	async getPage(page: number, limit: number): Promise<ProductsResponse> {
		const skip = (page - 1) * limit;

		const [data, total] = await this.productRepository.findAndCount({
			skip,
			take: limit,
			order: { id: 'ASC' },
		});

		return {
			data,
			total,
		};
	}

	async create(productDto: ProductDto): Promise<Product> {
		const { article, name, price, quantity } = productDto;

		await this.checkUniqueArticle(article);

		const product = this.productRepository.create({
			article,
			name,
			price,
			quantity,
		});
		return await this.productRepository.save(product);
	}

	async update(id: number, productDto: ProductDto): Promise<Product> {
		const product = await this.productRepository.findOne({
			where: { id },
		});

		if (!product) {
			throw new NotFoundException('Продукт не найден');
		}

		await this.checkUniqueArticle(productDto.article, id);

		Object.assign(product, productDto);
		return this.productRepository.save(product);
	}

	async delete(id: number): Promise<void> {
		const result = await this.productRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException('Продукт не найден');
		}
	}

	private async checkUniqueArticle(article: string, excludeId?: number) {
		const query = this.productRepository
			.createQueryBuilder('product')
			.where('product.article = :article', { article });

		if (excludeId) {
			query.andWhere('product.id != :id', { id: excludeId });
		}

		const exists = await query.getOne();
		if (exists) {
			throw new ConflictException('Артикул уже существует');
		}
	}
}
