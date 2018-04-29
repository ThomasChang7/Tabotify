exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Thomas Chang',
          email: 'tomchang93@gmail.com',
          accessToken: 'tokenOfAccess',
          photo: 'photoHere',
        },
        {
          id: 2,
          name: 'Melisa Cheng',
          email: 'melmelmelmel@gmail.com',
          accessToken: 'tokenOfAccess',
          photo: 'photoHere',
        },
        {
          id: 3,
          name: 'Fred Chen',
          email: 'Fred@gmail.com',
          accessToken: 'tokenOfAccess',
          photo: 'photoHere',
        },
      ]);
    });
};
