exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('firstName');
      table.dropColumn('lastName');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.string('firstName');
      table.string('lastName');
    }),
  ]);
};
