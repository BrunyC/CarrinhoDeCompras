import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	name: string;

	@ApiProperty({ type: 'string' })
	@IsString()
	email: string;
}
