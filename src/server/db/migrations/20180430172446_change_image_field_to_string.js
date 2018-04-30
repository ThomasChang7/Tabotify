exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', table => {
      table.string('photo').alter();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', table => {
      table.json('photo').alter();
    }),
  ]);
};
