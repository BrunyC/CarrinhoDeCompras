module.exports = {
  apps: [
    {
      name: 'product_price',
      script: './dist/microservices/product_price/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
