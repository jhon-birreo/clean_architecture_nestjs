// 📂 src/modules/product/application/use-cases/get-product.use-case.ts

import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { ProductNotFoundException } from '../exceptions/product-not-found.exception';

export class GetProductUseCase {
	constructor(private readonly productRepository: ProductRepositoryImpl) {}

	async execute(productId: string) {
		const product = await this.productRepository.findById(productId);
		if (!product) {
			throw new ProductNotFoundException(productId);
		}
		return product;
	}
}
