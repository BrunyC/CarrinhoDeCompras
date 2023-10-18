import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	cart_id: number;
}
