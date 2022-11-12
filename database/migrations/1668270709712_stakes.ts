import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stakes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.bigInteger('amount')
      table.timestamp('start_date',  { useTz: true })
      table.timestamp('end_date',  { useTz: true })

      table
        .integer('task_id')
        .unsigned()
        .references('tasks.id')
        .onDelete('SET NULL')

      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('SET NULL')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
