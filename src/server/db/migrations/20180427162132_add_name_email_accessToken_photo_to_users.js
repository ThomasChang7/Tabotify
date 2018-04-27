exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.string('name');
      table.string('email');
      table.string('accessToken');
      table.json('photo');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('name');
      table.dropColumn('email');
      table.dropColumn('accessToken');
      table.dropColumn('photo');
    }),
  ]);
};
