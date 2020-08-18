import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AuthenticateUserService from './AuthenticateUserSevice'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticaetUser: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
    authenticaetUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
  })

  it('should be able authenticate', async () => {
    const user = await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    const response = await authenticaetUser.execute({
      email: 'mario@contact.com',
      password: '12345678'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticaetUser.execute({
        email: 'mario@contact.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    await expect(
      authenticaetUser.execute({
        email: 'mario@contact.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
