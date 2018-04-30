exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table
        .timestamp('created_at', true)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .timestamp('updated_at', true)
        .notNullable()
        .defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
  ]);
};
