import { Module } from '@nestjs/common';
import { HealthCheckController } from './healtCheck.controller';

@Module({
	imports: [],
	controllers: [HealthCheckController],
	providers: []
})
export class HealthCheckModule {}
