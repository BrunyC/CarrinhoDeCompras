import { OrderStatus } from '@lib/enum/dto.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
	@ApiProperty({ type: 'number' })
	@IsNumber()
	@IsNotEmpty()
	cart_id: number;

	@ApiProperty({ type: 'number' })
	@IsNumber()
	@IsNotEmpty()
	user_id: number;

	@ApiProperty({ enum: OrderStatus })
	@IsEnum(OrderStatus)
	@IsNotEmpty()
	status: OrderStatus;
}
