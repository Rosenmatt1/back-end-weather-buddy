module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/weather'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }

};
