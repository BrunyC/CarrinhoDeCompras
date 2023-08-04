import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	username: string;

	@ApiProperty({ type: 'string' })
	@IsString()
	cpf: string;
}
