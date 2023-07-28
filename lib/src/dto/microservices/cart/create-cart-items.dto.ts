import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CartItemDto {
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
	price: number;

    @ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	months: number;

    @ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
    @IsBoolean()
	status: boolean;
}
