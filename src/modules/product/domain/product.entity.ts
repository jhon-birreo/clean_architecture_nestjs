import type { PriceVO } from './value-object/price.vo';
import type { ProductNameVO } from './value-object/product-name.vo';

export class Product {
	constructor(
		private readonly _id: string,
		private _name: ProductNameVO,
		private _price: PriceVO,
		private _stock: number
	) {
		if (_stock < 0) {
			throw new Error('El stock no puede ser negativo');
		}
	}

	// Getters
	get id(): string {
		return this._id;
	}

	get name(): ProductNameVO {
		return this._name;
	}

	get price(): PriceVO {
		return this._price;
	}

	get stock(): number {
		return this._stock;
	}

	// Métodos de dominio
	updateName(newName: ProductNameVO): void {
		this._name = newName;
	}

	updatePrice(newPrice: PriceVO): void {
		this._price = newPrice;
	}

	addStock(quantity: number): void {
		if (quantity <= 0) throw new Error('La cantidad debe ser positiva');
		this._stock += quantity;
	}

	removeStock(quantity: number): void {
		if (quantity <= 0) throw new Error('La cantidad debe ser positiva');
		if (this._stock - quantity < 0) throw new Error('Stock insuficiente');
		this._stock -= quantity;
	}
}
