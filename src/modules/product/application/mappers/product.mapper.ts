import { Product } from '../../domain/product.entity';

export class ProductMapper {
	static toDTO(product: Product) {
		return {
			id: product.id,
			name: product.name.value, // Assuming a public method 'getValue()' exists to access the value
			price: product.price.value, // Assuming a public method 'getValue()' exists to access the value
			stock: product.stock
		};
	}

	static toDomain(raw: any): Product {
		return new Product(raw.id, raw.name, raw.price, raw.stock);
	}
}
