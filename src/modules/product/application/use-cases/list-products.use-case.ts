// 📂 src/modules/product/application/use-cases/list-products.use-case.ts
import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { ProductMapper } from '../mappers/product.mapper';

export class ListProductsUseCase {
	constructor(private readonly productRepository: ProductRepositoryImpl) {}

	async execute() {
		const products = await this.productRepository.findAll();
		return products.map(product => ProductMapper.toDTO(product));
	}
}
