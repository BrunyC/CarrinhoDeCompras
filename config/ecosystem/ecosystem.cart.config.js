module.exports = {
  apps: [
    {
      name: 'cart',
      script: './dist/microservices/cart/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
