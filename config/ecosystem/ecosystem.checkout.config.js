module.exports = {
  apps: [
    {
      name: 'checkout',
      script: './dist/microservices/checkout/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
