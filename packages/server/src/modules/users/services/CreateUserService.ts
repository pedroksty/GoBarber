import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersREpository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExits = await this.usersRepository.findByEmail(email)

    if (checkUserExits) {
      throw new AppError('Email já existente')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    await this.cacheProvider.invalidatePrefix('providers-lists:*')

    await this.cacheProvider.invalidate(`provider-appointments:*`)

    return user
  }
}

export default CreateUserService
