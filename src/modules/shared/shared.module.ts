import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/db/prisma/prisma.service';
import { PrismaModule } from './infrastructure/db/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [PrismaService],
	exports: [PrismaModule]
})
export class SharedModule {}
