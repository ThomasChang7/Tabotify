exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, firstName: 'Thomas', lastName: 'Chang' },
        { id: 2, firstName: 'Melissa', lastName: 'Cheng' },
        { id: 3, firstName: 'Fred', lastName: 'Chen' },
      ]);
    });
};
