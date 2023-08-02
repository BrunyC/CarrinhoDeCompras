import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCartDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	status: boolean;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	default: boolean;
}
