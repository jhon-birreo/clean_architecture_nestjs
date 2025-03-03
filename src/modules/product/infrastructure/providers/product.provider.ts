import { Provider } from '@nestjs/common';
import {
	CREATE_PRODUCT_USE_CASE,
	DELETE_PRODUCT_USE_CASE,
	GET_PRODUCT_USE_CASE,
	LIST_PRODUCTS_USE_CASE,
	UPDATE_PRODUCT_USE_CASE
} from 'src/modules/shared/constants/types.constsnt';
import { PrismaService } from 'src/modules/shared/infrastructure/db/prisma/prisma.service';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';
import { ProductRepositoryImpl } from '../../domain/product.repository';
import { PrismaProductRepository } from '../persistence/prisma-product.repository';

export const productProviders: Provider[] = [
	// 📌 Registramos primero el repositorio
	{
		provide: ProductRepositoryImpl,
		useClass: PrismaProductRepository
	},

	// 📌 Ahora registramos los casos de uso
	{
		provide: CREATE_PRODUCT_USE_CASE,
		useFactory: (repo: PrismaProductRepository) => new CreateProductUseCase(repo),
		inject: [ProductRepositoryImpl]
	},
	{
		provide: UPDATE_PRODUCT_USE_CASE,
		useFactory: (repo: ProductRepositoryImpl) => new UpdateProductUseCase(repo),
		inject: [ProductRepositoryImpl]
	},
	{
		provide: DELETE_PRODUCT_USE_CASE,
		useFactory: (repo: ProductRepositoryImpl) => new DeleteProductUseCase(repo),
		inject: [ProductRepositoryImpl]
	},
	{
		provide: GET_PRODUCT_USE_CASE,
		useFactory: (repo: ProductRepositoryImpl) => new GetProductUseCase(repo),
		inject: [ProductRepositoryImpl]
	},
	{
		provide: LIST_PRODUCTS_USE_CASE,
		useFactory: (repo: ProductRepositoryImpl) => new ListProductsUseCase(repo),
		inject: [ProductRepositoryImpl]
	}
];
