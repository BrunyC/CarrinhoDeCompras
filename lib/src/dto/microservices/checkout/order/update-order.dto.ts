import { OrderStatus } from '@lib/enum/dto.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	payment_status: boolean;

	@ApiProperty({ enum: OrderStatus })
	@IsEnum(OrderStatus)
	@IsOptional()
	status: OrderStatus;
}
