import { ApiProperty } from '@nestjs/swagger';

export class ResponseNotificationDto {
	@ApiProperty({ type: 'string' })
	body: string;
}
