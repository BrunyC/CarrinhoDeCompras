import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	title: string;

	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsNumber()
	qty: number;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	status: boolean;
}
