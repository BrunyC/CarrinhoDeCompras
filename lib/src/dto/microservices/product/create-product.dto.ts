import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
	@ApiProperty({ type: 'string' })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	qty: number;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;
}
