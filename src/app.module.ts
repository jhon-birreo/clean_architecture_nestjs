import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { PrismaModule } from './modules/shared/infrastructure/db/prisma/prisma.module';

@Module({
	imports: [
		ModulesModule // 📌 Importamos el módulo de Productos
	]
})
export class AppModule {}
