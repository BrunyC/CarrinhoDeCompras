import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../../prisma/prisma.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
	imports: [PrismaModule],
	controllers: [PaymentsController],
	providers: [PaymentsService]
})
export class PaymentsModule {}
