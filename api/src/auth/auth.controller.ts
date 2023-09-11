import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiProperty, ApiOkResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ResponseTypeDto } from '@lib/dto/general/index';
import { UserCredentialsDto } from '@lib/dto/api/user/user-credentials.dto';
import { AccessTokenDto } from '@lib/dto/api/auth/access-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/getaccesstoken')
	@ApiProperty({ type: UserCredentialsDto, description: 'Given name and cpf registered, will be generated a new access token.' })
	@ApiOkResponse({ type: AccessTokenDto, description: 'Access granted' })
	@ApiForbiddenResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred, a message explaining will be notified.' })
	async getAccessToken(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<AccessTokenDto> {
		return this.authService.getAccessToken(userCredentialsDto);
	}
}
