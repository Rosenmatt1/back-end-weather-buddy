exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: "Mateo",
          phone: "111-111-1111",
          email: "Matty85@aol.com",
          password: "4*55bacThe23",
        },
        {
          name: "Jane",
          phone: "222-222-2222",
          email: "Jane52@aol.com",
          password: "501cat&459",
        },
        {
          name: "Henry",
          phone: "333-333-3333",
          email: "Henry13@aol.com",
          password: "theRust%862",
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq',(SELECT MAX(id) FROM users))"
      )
    })
}