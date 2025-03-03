// 📂 src/modules/product/domain/repositories/product.repository.ts

import type { Product } from './product.entity';
export const PRODUCT_REPOSITORY_IMPL = 'productRepositoryImpl';

export abstract class ProductRepositoryImpl {
	abstract save(product: Product): Promise<void>;
	abstract update(product: Product): Promise<void>;
	abstract delete(productId: string): Promise<void>;
	abstract findById(productId: string): Promise<Product | null>;
	abstract findByName(name: string): Promise<Product | null>;
	abstract findAll(): Promise<Product[]>;
}
