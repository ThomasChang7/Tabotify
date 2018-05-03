exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 13,
          name: 'Thomas Chang',
          email: 'tomchang93@gmail.com',
          username: 'mrchangman',
          photo: 'photoHere',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 2,
          name: 'Melisa Cheng',
          email: 'melmelmelmel@gmail.com',
          username: 'melcheng',
          photo: 'photoHere',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 3,
          name: 'Fred Chen',
          email: 'Fred@gmail.com',
          username: 'divinexcross',
          photo: 'photoHere',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ]);
    });
};
