import { PaymentStatus } from '@lib/enum/dto.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	order_id: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	value: number;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	transaction_id: number;

	@ApiProperty({ enum: PaymentStatus })
	@IsEnum(PaymentStatus)
	@IsNotEmpty()
	status: PaymentStatus;
}
