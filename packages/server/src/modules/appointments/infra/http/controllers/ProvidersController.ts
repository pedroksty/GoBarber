import { Request, Response } from 'express'

import { container } from 'tsyringe'

import ListProvidersServices from '@modules/appointments/services/ListProvidersService'
import { classToClass } from 'class-transformer'

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProviders = container.resolve(ListProvidersServices)

    const providers = await listProviders.execute({
      user_id
    })

    return response.json(classToClass(providers))
  }
}

export default new ProvidersController()
