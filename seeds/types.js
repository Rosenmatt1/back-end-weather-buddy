exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {
          maxTemp: 90,
          minTemp: 40,
          chanceRain: 60,
          inchesSnow: 4,
        },
        {
          maxTemp: null,
          minTemp: 50,
          chanceRain: null,
          inchesSnow: null,
        },
        {
          maxTemp: 75,
          minTemp: null,
          chanceRain: null,
          inchesSnow: null,
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('types_id_seq',(SELECT MAX(id) FROM types))"
      )
    })
}