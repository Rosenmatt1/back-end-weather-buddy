exports.up = function (knex, Promise) {
  return knex.schema.createTable('types', table => {
    table.increments('id')
    table.string('maxTemp').defaultsTo('')
    table.string('minTemp').defaultsTo('')
    table.string('chanceRain').defaultsTo('')
    table.string('inchesSnow').defaultsTo('')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('types')
};

