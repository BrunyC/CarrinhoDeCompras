module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/api/main.js',
      env: {
        TZ: 'America/Sao_Paulo',
      },
    },
    {
      name: 'product',
      script: './dist/microservices/product/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
	  },
    {
      name: 'product_price',
      script: './dist/microservices/product_price/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
	  },
    {
      name: 'user',
      script: './dist/microservices/user/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
	  },
    {
      name: 'cart',
      script: './dist/microservices/cart/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
	  },
     {
      name: 'checkout',
      script: './dist/microservices/checkout/main.js',
      env: {
        TZ: 'America/Sao_Paulo'
      }
	  }
  ],
};
