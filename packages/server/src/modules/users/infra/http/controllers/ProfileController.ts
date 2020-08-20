import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class ProfileController {
  public async show(request: Request, response: Response) {
    const user_id = request.user.id

    const ShowProfile = container.resolve(ShowProfileService)

    const user = await ShowProfile.execute({ user_id })

    return response.json(classToClass(user))
  }

  public async update(request: Request, response: Response) {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      name,
      email,
      old_password,
      password,
      user_id
    })

    return response.json(classToClass(user))
  }
}

export default new ProfileController()
