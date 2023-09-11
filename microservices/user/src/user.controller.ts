import { Controller } from '@nestjs/common';
import { Payload, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserPattern } from '@lib/enum/microservices.pattern.enum';
import { CreateUserDto, UpdateUserDto } from '@lib/dto/microservices/user/index';

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern(UserPattern.GET_USER)
	async getUser(@Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.userService.getUser();

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(UserPattern.POST_USER)
	async createdUser(@Payload() data: CreateUserDto, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.userService.createdUser(data);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(UserPattern.UPDATE_USER)
	async updateUser(@Payload() data: { id: number; user: UpdateUserDto }, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		try {
			const result = await this.userService.updateUser(data.id, data.user);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}

	@MessagePattern(UserPattern.REMOVE_USER)
	async deleteUser(@Payload() id: number, @Ctx() context: RmqContext): Promise<any> {
		const channel = context.getChannelRef();
		const message = context.getMessage();

		try {
			const result = await this.userService.deleteUser(id);

			channel.ack(message);

			return result;
		} catch (error) {
			channel.ack(message);

			throw error;
		}
	}
}
