import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCartItemDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	cart_id: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	product_id: number;
}
