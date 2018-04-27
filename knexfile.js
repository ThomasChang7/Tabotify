const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
require('dotenv').config();

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${process.env.dbUsername}:${
      process.env.dbPassword
    }@localhost:5432/tabotify_api_test`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: `postgres://${process.env.dbUsername}:${
      process.env.dbPassword
    }@localhost:5432/tabotify_api`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
