import { Controller, Delete, Get, Headers, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiHeader,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ResponseTypeDto } from '@lib/dto/general/index';
import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@lib/dto/microservices/user/index';

@ApiTags('User')
@Controller('user')
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOkResponse({ type: ResponseTypeDto, description: 'User found.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiNotFoundResponse({ type: ResponseTypeDto, description: 'No records found with these parameters.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async getUser(@Headers() headers: any): Promise<any> {
		return this.userService.getUser(headers);
	}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: CreateUserDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The user has been successfully created.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async createUser(@Payload() data: CreateUserDto): Promise<ResponseTypeDto> {
		return this.userService.createUser(data);
	}

	@Put('/:id')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true, forbidNonWhitelisted: true }))
	@ApiBody({
		type: UpdateUserDto,
		description: 'The body request is a json.'
	})
	@ApiCreatedResponse({ type: ResponseTypeDto, description: 'The user has been successfully updated.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async updateUser(@Param('id') id: string, @Payload() data: UpdateUserDto): Promise<any> {
		return this.userService.updateUser(data, Number(id));
	}

	@Delete('/:id')
	@ApiOkResponse({ type: ResponseTypeDto, description: 'The user has been successfully deleted.' })
	@ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred. A message explaining will be notified.' })
	@ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	async deleteUser(@Param('id') id: string): Promise<ResponseTypeDto> {
		return this.userService.deleteUser(Number(id));
	}
}
