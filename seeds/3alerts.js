exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          message: "Wear shorts and sandals",
          user_id: 3,
          type_id: 2,
        },
        {
          message: "Wear thermals with hat and gloves",
          user_id: 1,
          type_id: 3,
        },
        {
          message: "sleep in",
          user_id: 2,
          type_id: 1,
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('alerts_id_seq',(SELECT MAX(id) FROM alerts))"
      )
    })
}
