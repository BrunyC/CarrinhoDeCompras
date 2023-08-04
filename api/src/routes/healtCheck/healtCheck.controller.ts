import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHealthCheckDto } from '@lib/dto/api/healthCheck/index';

@ApiTags('Meli')
@Controller('Meli/healthCheck')
export class HealthCheckController {
	@Get()
	@ApiOkResponse({ type: ResponseHealthCheckDto, description: 'ok' })
	async healthCheck(): Promise<ResponseHealthCheckDto> {
		return {
			body: 'OK'
		};
	}
}
