exports.up = function (knex, Promise) {
  return Promise.all([knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('username');
    table.string('photo');
    table.timestamp('created_at', true).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', true).notNullable().defaultTo(knex.fn.now());
  })]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')]);
};
//# sourceMappingURL=20180426171120_create_users.js.map