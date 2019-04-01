exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          message: "Wear shorts and sandals",
          user_id: "",
          type_id: "",
        },
        {
          message: "Wear thermals with hat and gloves",
          user_id: "",
          type_id: "",
        },
        {
          message: "sleep in",
          user_id: "",
          type_id: "",
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('alerts_id_seq',(SELECT MAX(id) FROM alerts))"
      )
    })
}
