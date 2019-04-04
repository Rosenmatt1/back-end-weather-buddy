exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name').notNullable().defaultsTo('')
    table.string('phone').notNullable().defaultsTo("000-0000-0000")
    table.string('email').unique().notNullable()
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('lat').notNullable().defaultsTo(0)
    table.integer('long').notNullable().defaultsTo(0)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};

