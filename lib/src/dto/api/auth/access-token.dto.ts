import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
	@ApiProperty({ type: 'string' })
	@IsString()
	@IsNotEmpty()
	accessToken: string;
}
