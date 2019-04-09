exports.up = function (knex, Promise) {
  return knex.schema.createTable('alerts', table => {
    table.increments('id')
    table.string('message').notNullable().defaultsTo('')
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index()
    table.string('type').notNullable().defaultsTo('')
    table.integer('chosenTemp').notNullable().defaultsTo(0)
    table.integer('weatherTemp').notNullable().defaultsTo(0)
    // table.integer('type_id').notNullable().references('id').inTable('types').onDelete('CASCADE').index()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('alerts')
}
