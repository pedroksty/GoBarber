import { Request, Response } from 'express'

import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'

class ProfileController {
  public async show(request: Request, response: Response) {
    // exibir perfil
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

    delete user.password

    return response.json(user)
  }
}

export default new ProfileController()
