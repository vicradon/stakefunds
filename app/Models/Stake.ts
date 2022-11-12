import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne,
  HasOne } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import User from './User'

export default class Stake extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column()
  public amount: BigInt
  
  @hasOne(() => Task)
  public task: HasOne<typeof Task>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
