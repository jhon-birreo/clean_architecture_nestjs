// 📂 src/modules/product/infrastructure/persistence/prisma-product.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/shared/infrastructure/db/prisma/prisma.service';
import { Product } from '../../domain/product.entity';
import type { ProductRepositoryImpl } from '../../domain/product.repository';
import { PriceVO } from '../../domain/value-object/price.vo';
import { ProductNameVO } from '../../domain/value-object/product-name.vo';

@Injectable()
export class PrismaProductRepository implements ProductRepositoryImpl {
	constructor(private readonly prisma: PrismaService) {}

	async save(product: Product): Promise<void> {
		await this.prisma.product.create({
			data: {
				id: product.id,
				name: product.name.value,
				price: product.price.value,
				stock: product.stock
			}
		});
	}

	async findById(id: string): Promise<Product | null> {
		const product = await this.prisma.product.findUnique({ where: { id } });
		if (!product) return null;

		return new Product(product.id, new ProductNameVO(product.name), new PriceVO(product.price), product.stock);
	}

	async findAll(): Promise<Product[]> {
		const products = await this.prisma.product.findMany();
		return products.map(p => new Product(p.id, new ProductNameVO(p.name), new PriceVO(p.price), p.stock));
	}

	async update(product: Product): Promise<void> {
		await this.prisma.product.update({
			where: { id: product.id },
			data: {
				name: product.name.value,
				price: product.price.value,
				stock: product.stock
			}
		});
	}

	async delete(id: string): Promise<void> {
		await this.prisma.product.delete({ where: { id } });
	}

	async findByName(name: string): Promise<Product | null> {
		const product = await this.prisma.product.findUnique({ where: { name } });
		if (!product) return null;

		return new Product(product.id, new ProductNameVO(product.name), new PriceVO(product.price), product.stock);
	}
}
