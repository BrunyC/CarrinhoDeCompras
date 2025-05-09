import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	lastname: string;

	@ApiProperty({ type: 'string' })
	@IsOptional()
	@IsString()
	cpf: string;

	@ApiProperty({ type: 'boolean' })
	@IsOptional()
	@IsBoolean()
	status: boolean;
}
