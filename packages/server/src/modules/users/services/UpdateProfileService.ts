import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersREpository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}
@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, user_id, email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user does not exits')
    }

    user.name = name
    user.email = email

    return this.usersRepository.save(user)
  }
}

export default UpdateProfile
