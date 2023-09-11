import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	cart_id: number;

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
	cart_item_sub_total: number;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	cart_item_status: boolean;
}
