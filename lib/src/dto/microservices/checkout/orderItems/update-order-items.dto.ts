import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemsDto {
	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsNumber()
	product_id: number;

	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsNumber()
	product_price_id: number;

	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsNumber()
	cart_item_sub_total: number;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	cart_item_status: boolean;
}
