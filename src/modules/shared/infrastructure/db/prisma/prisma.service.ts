// 📂 src/shared/infrastructure/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await this.$connect(); // Conectar Prisma al iniciar el módulo
	}

	async onModuleDestroy() {
		await this.$disconnect(); // Desconectar Prisma al cerrar el módulo
	}
}
