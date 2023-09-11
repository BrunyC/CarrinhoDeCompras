module.exports = {
  apps: [
    {
      name: 'user',
      script: './dist/microservices/user/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
