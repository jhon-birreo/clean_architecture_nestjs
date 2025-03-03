// 📂 src/modules/product/application/use-cases/delete-product.use-case.ts

import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { ProductNotFoundException } from '../exceptions/product-not-found.exception';

export class DeleteProductUseCase {
	constructor(private readonly productRepository: ProductRepositoryImpl) {}

	async execute(productId: string): Promise<void> {
		const product = await this.productRepository.findById(productId);
		if (!product) {
			throw new ProductNotFoundException(productId);
		}
		await this.productRepository.delete(productId);
	}
}
