module.exports = {
  apps: [
    {
      name: 'product',
      script: './dist/microservices/product/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
