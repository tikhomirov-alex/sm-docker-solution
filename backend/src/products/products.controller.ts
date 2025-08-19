import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResponse } from './dto/products-response.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductResponse } from './dto/product.response.dto';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getProductsPage(
		@Query()
		query: PaginationDto,
	): Promise<ProductsResponse> {
		return this.productsService.getPage(query.page, query.limit);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createProduct(
		@Body()
		productDto: ProductDto,
	): Promise<ProductResponse> {
		const createdProduct = await this.productsService.create(productDto);
		return {
			status: HttpStatus.CREATED,
			message: 'Продукт успешно создан',
			data: createdProduct,
		};
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Param('id', new ParseIntPipe()) id: number,
		@Body()
		productDto: ProductDto,
	): Promise<ProductResponse> {
		const updatedProduct = await this.productsService.update(id, productDto);
		return {
			status: HttpStatus.OK,
			message: 'Продукт успешно обновлен',
			data: updatedProduct,
		};
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
		await this.productsService.delete(id);
	}
}
