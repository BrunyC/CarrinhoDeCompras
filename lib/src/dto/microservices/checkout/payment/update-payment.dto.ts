import { PaymentStatus } from '@lib/enum/dto.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDto {
	@ApiProperty({ enum: PaymentStatus })
	@IsEnum(PaymentStatus)
	@IsNotEmpty()
	status: PaymentStatus;
}
