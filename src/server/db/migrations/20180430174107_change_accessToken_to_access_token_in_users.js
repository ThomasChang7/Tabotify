exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', table => {
      table.renameColumn('accessToken', 'access_token');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', table => {
      table.renameColumn('access_token', 'accessToken');
    }),
  ]);
};
