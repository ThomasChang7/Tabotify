process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../src/server');
const knex = require('../src/server/db/config');

describe('Routes: users', () => {
  beforeEach(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()));

  afterEach(() => {
    knex.migrate.rollback();
    server.close();
  });

  describe('GET /users/:id', () => {
    test('Should return single user', async () => {
      const res = await chai.request(server).get('/users/13');

      expect(res.status).toEqual(200);
      expect(res.body.username).toEqual('mrchangman');
      expect(res.body.name).toEqual('Thomas Chang');
    });
  });
});
