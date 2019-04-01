exports.up = function (knex, Promise) {
  return knex.schema.createTable('methods', table => {
    table.increments('id')
    table.string('name').notNullable().defaultsTo('')
    table.string('phone').notNullable().defaultsTo('')
    table.string('email').notNullable().defaultsTo('')
    table.string('password').notNullable().defaultsTo('')
    // table.integer('population').notNullable().defaultsTo(0)
    // table.timestamps(true, true)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('methods')
};

