module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/api/main.js',
      env: {
        TZ: 'America/Sao_Paulo',
      },
    },
    {
		name: 'notifications',
		script: 'dist/microservices/notifications/main.js',
		env: {
			TZ: 'America/Sao_Paulo'
		}
	}
  ],
};
