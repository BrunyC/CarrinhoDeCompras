import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CartDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	default: boolean;
}
