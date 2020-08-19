import { Request, Response } from 'express'

import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, provider_id } = request.body

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      year,
      month
    })

    return response.json(availability)
  }
}

export default new ProviderMonthAvailabilityController()
