import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemsDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	product_id: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	product_price_id: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	sub_total: number;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;
}
