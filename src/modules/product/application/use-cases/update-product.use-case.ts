import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { PriceVO } from '../../domain/value-object/price.vo';
import { ProductNameVO } from '../../domain/value-object/product-name.vo';
import type { UpdateProductDTO } from '../dtos/update-product.dto';
import { ProductNotFoundException } from '../exceptions/product-not-found.exception';

export class UpdateProductUseCase {
	constructor(private readonly productRepository: ProductRepositoryImpl) {}

	async execute(dto: UpdateProductDTO): Promise<void> {
		const product = await this.productRepository.findById(dto.id);
		if (!product) {
			throw new ProductNotFoundException(dto.id);
		}

		if (dto.name) {
			product.updateName(new ProductNameVO(dto.name));
		}
		if (dto.price !== undefined) {
			product.updatePrice(new PriceVO(dto.price));
		}
		if (dto.stock !== undefined) {
			product.addStock(dto.stock);
		}

		await this.productRepository.update(product);
	}
}
