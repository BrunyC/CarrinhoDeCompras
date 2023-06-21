import { RmqContext } from '@nestjs/microservices';
import { NotificationController } from '@notification/notification.controller';

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let mock;

  	//@ts-ignore
	const channel = {
		ack: jest.fn().mockImplementation(() => ({}))
	};

    //@ts-ignore
	const context: RmqContext = {
		getChannelRef: jest.fn().mockImplementation(() => channel),
		getMessage: jest.fn().mockImplementation(() => ({}))
	};

    const notificationServiceMock: any = {
		sendNotification: jest.fn()
    };

    beforeEach(() => {
		mock = jest.fn();

		notificationController = new NotificationController(notificationServiceMock);
	});

    describe('notification', () => {
        it('should call service.sendNotification', async () => {
            jest.spyOn(notificationServiceMock, 'sendNotification').mockResolvedValue(undefined);

			expect(await notificationController.notification(mock, context)).toEqual(undefined);
        });

        it('should throw error if service.sendNotification fails', async () => {
            jest.spyOn(notificationServiceMock, 'sendNotification').mockRejectedValue(new Error());

            await expect(async () => notificationController.notification(mock, context)).rejects.toBeInstanceOf(Error);
        });
    });
});
