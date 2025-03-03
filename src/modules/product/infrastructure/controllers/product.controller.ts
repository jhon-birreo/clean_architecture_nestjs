import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import {
	CREATE_PRODUCT_USE_CASE,
	DELETE_PRODUCT_USE_CASE,
	GET_PRODUCT_USE_CASE,
	LIST_PRODUCTS_USE_CASE,
	UPDATE_PRODUCT_USE_CASE
} from 'src/modules/shared/constants/types.constsnt';
import type { CreateProductDTO } from '../../application/dtos/create-product.dto';
import type { UpdateProductDTO } from '../../application/dtos/update-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';

@Controller('products')
export class ProductController {
	constructor(
		@Inject(CREATE_PRODUCT_USE_CASE)
		private readonly createProductUseCase: CreateProductUseCase,

		@Inject(UPDATE_PRODUCT_USE_CASE)
		private readonly updateProductUseCase: UpdateProductUseCase,

		@Inject(DELETE_PRODUCT_USE_CASE)
		private readonly deleteProductUseCase: DeleteProductUseCase,

		@Inject(GET_PRODUCT_USE_CASE)
		private readonly getProductUseCase: GetProductUseCase,

		@Inject(LIST_PRODUCTS_USE_CASE)
		private readonly listProductsUseCase: ListProductsUseCase
	) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDTO) {
		return this.createProductUseCase.execute(createProductDto);
	}

	@Get()
	async findAll() {
		return this.listProductsUseCase.execute();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.getProductUseCase.execute(id);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
		return this.updateProductUseCase.execute({ ...updateProductDto, id });
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.deleteProductUseCase.execute(id);
	}
}
