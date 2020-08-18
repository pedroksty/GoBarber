import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersREpository'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('user does not exits')
    }
    return user
  }
}

export default ShowProfileService
