import { ApiProperty } from '@nestjs/swagger';

export class ResponseHealthCheckDto {
	@ApiProperty({ type: 'string' })
	body: string;
}
