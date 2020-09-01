import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersREpository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  user_id: string
  avatarFileName: string
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = fileName

    await this.usersRepository.save(user)

    await this.cacheProvider.invalidatePrefix('providers-lists:*')
    await this.cacheProvider.invalidate('provider-appointments:*')

    return user
  }
}

export default UpdateUserAvatarService
