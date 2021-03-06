exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_favorites', table => {
      table.increments('id').primary();
      table.integer('users_id').references('users.id');
      table.integer('favorites_id').references('favorites.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users_favorites')]);
};
