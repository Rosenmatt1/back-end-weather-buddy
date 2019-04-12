exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: "Mateo",
          phone: "6177193300",
          email: "matty85@aol.com",
          hashed_password: "4*55bacTge23",
          lat: 39,
          long: 105
        },
        {
          name: "Jane",
          phone: "6177193300",
          email: "jane52@aol.com",
          hashed_password: "501cat&459",
          lat: 51,
          long: 0
        },
        {
          name: "Henry",
          phone: "6177193300",
          email: "henry13@aol.com",
          hashed_password: "t!he9z%862djf",
          lat: 42,
          long: 71
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq',(SELECT MAX(id) FROM users))"
      )
    })
}