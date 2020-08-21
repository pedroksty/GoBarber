import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUserRepository: FakeUserRepository
let fakehashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakehashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUser = new CreateUserService(
      fakeUserRepository,
      fakehashProvider,
      fakeCacheProvider
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    await expect(
      createUser.execute({
        name: 'Mario Prato',
        email: 'mario@contact.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
