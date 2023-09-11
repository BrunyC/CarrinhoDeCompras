import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductPriceDto {
	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsNumber()
	price: number;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	status: boolean;
}
