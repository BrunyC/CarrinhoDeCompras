import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CartDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	user_id: number;

	@ApiProperty({ type: 'string' })
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
    @IsBoolean()
	status: boolean;

    @ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
    @IsBoolean()
	default: boolean;
}
