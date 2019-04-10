exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          message: "Wear shorts and sandals",
          user_id: 1,
          user_email: 'Matty85@aol.com',
          type: 'max',
          chosenTemp: 90,
          weatherTemp: 95,
        },
        {
          message: "Wear thermals with hat and gloves",
          user_id: 1,
          user_email: 'Matty85@aol.com',
          type: 'min',
          chosenTemp: 40,
          weatherTemp: 20,
        },
        {
          message: "Run for the hills",
          user_id: 1,
          user_email: 'Matty85@aol.com',
          type: 'min',
          chosenTemp: 20,
          weatherTemp: 50,
        },
        {
          message: "sleep in",
          user_id: 2,
          user_email: 'Jane52@aol.com',
          type: 'min',
          chosenTemp: 40,
          weatherTemp: 35,
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('alerts_id_seq',(SELECT MAX(id) FROM alerts))"
      )
    })
}
