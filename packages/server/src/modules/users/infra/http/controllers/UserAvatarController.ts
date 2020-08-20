import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UsersAvatarController {
  async update(request: Request, response: Response) {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })
    return response.json(classToClass(user))
  }
}

export default new UsersAvatarController()
