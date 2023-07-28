// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	forceExit: false,
	cache: false,
	clearMocks: true,
	coveragePathIgnorePatterns: ['dto.ts', 'rabbitmq.module.ts'],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60
		}
	},
	setupFiles: ['dotenv/config'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '(?<!e2e).spec.ts$',
	rootDir: '.',
	transform: {
		'^.+\\.(js|ts)$': 'ts-jest'
	},
	moduleNameMapper: {
		'^@lib/dto/microservices/ml-notifications/(.*)': ['<rootDir>/lib/src/dto/microservices/ml-notifications/$1'],
		'^@lib/dto/microservices/cart/(.*)': ['<rootDir>/lib/src/dto/microservices/cart/$1'],
		'^@lib/enum/(.*)': ['<rootDir>/lib/src/enum/$1'],
		'^@lib/type/(.*)': ['<rootDir>/lib/src/type/$1'],
		'^@config/(.*)': ['<rootDir>/config/services/$1'],
		'^@api/(.*)': ['<rootDir>/api/src/$1'],
		'^@ml-notifications/(.*)': ['<rootDir>/microservices/ml-notifications/src/$1'],
		'^@cart/(.*)': ['<rootDir>/microservices/cart/src/$1']
	},
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	roots: [
		'api/test',
		'lib/test',
		'config/test',
		'microservices/ml-notifications/test'
	],
	displayName: {
		name: 'Microservices Unit Tests',
		color: 'blue'
	}
};

export default config;
