import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/infrastructure/db/prisma/prisma.module';
import { ProductController } from './infrastructure/controllers/product.controller';
import { productProviders } from './infrastructure/providers/product.provider';
import { SharedModule } from '../shared/shared.module';

@Module({
	imports: [SharedModule], // 📌 Importamos PrismaModule para usar PrismaService
	controllers: [ProductController],
	providers: [...productProviders], // 📌 Registramos todos los providers correctamente
	exports: [...productProviders]
})
export class ProductModule {}
