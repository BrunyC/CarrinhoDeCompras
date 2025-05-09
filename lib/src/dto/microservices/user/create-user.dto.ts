import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ type: 'string' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ type: 'string' })
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@ApiProperty({ type: 'number' })
	@IsNotEmpty()
	@IsNumber()
	user_id: number;

	@ApiProperty({ type: 'boolean' })
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;
}
