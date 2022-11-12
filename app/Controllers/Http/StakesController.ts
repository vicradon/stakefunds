import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stake from 'App/Models/Stake'

export default class StakesController {
  public async index({auth}: HttpContextContract) {
    return auth.user
  }
  public async create({auth, request}: HttpContextContract) {
    const user = auth.user
    const amount = request.input('amount')
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')
    const stake = new Stake()
    stake.amount = amount
    stake.startDate = startDate
    stake.endDate = endDate


  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
