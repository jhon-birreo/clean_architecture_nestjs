// 📂 src/modules/product/application/use-cases/create-product.use-case.ts

import * as crypto from 'crypto';
import { Product } from '../../domain/product.entity';
import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { PriceVO } from '../../domain/value-object/price.vo';
import { ProductNameVO } from '../../domain/value-object/product-name.vo';
import type { CreateProductDTO } from '../dtos/create-product.dto';
import { Injectable } from '@nestjs/common';
import { ProductExistException } from '../exceptions/product-exist.exception';

export class CreateProductUseCase {
	constructor(private readonly productRepository: ProductRepositoryImpl) {}

	async execute(dto: CreateProductDTO): Promise<void> {
		// 🔹 Validamos que no haya productos con el mismo nombre
		const existingProduct = await this.productRepository.findByName(dto.name);

		if (existingProduct) {
			throw new ProductExistException(dto.name);
		}

		// 🔹 Creamos el producto
		const product = new Product(crypto.randomUUID(), new ProductNameVO(dto.name), new PriceVO(dto.price), dto.stock);
		console.log(product);
		
		await this.productRepository.save(product);
	}
}
