import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDto {
	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	topic: string;

	@ApiProperty({ type: 'string' })
	@IsString()
	@IsOptional()
	resource: string;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	user_id: number;
}
