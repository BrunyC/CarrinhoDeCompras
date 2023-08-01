module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/api/main.js',
      env: {
        TZ: 'America/Sao_Paulo',
      }
    }
  ]
};
