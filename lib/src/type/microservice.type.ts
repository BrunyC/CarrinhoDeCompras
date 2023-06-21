import { Microservice } from '@lib/enum/index';

export type MicroserviceType =
	| Microservice.API
	| Microservice.NOTIFICATION
	| Microservice.ITEMS
	| Microservice.ITEMS2
	| Microservice.LOG_SYNC
	| Microservice.MESSAGES
	| Microservice.ORDERS_V2
	| Microservice.OTHERS
	| Microservice.PAYMENTS
	| Microservice.QUESTIONS
	| Microservice.SHIPMENTS
	| Microservice.TEST;
