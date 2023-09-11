import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCartDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	@IsOptional()
	title: string;
}
