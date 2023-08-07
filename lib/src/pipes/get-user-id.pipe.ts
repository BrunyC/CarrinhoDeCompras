import { AuthService } from '@api/auth/auth.service';
import { Inject, Injectable, Logger, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class GetUserPipe implements PipeTransform {
	constructor(
		@Inject(REQUEST) protected readonly request: Request,
		protected readonly authService: AuthService,
		protected readonly prisma: PrismaService
	) {}
	async transform(value: any): Promise<any> {
		try {
			const authToken = this.request.headers['authorization'].replace('Bearer ', '');

			const result = await this.authService.getUserFromToken(authToken);

			const user = await this.prisma.user.findUnique({ where: { id: result.payload.username.id } });

			return { user: user, data: value };
		} catch (error) {
			Logger.log(`An error occurred to get user id: ${JSON.stringify(error)}`, 'GetUserPipe');

			throw error;
		}
	}
}
