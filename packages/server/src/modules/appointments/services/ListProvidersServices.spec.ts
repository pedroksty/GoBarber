import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'

import ListProvidersService from './ListProvidersService'

let fakeUserRepository: FakeUserRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()

    listProviders = new ListProvidersService(fakeUserRepository)
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    const user2 = await fakeUserRepository.create({
      name: 'Mario colher',
      email: 'mario2@contact.com',
      password: '12345678'
    })

    const loggedUser = await fakeUserRepository.create({
      name: 'Mario garfo',
      email: 'mario3@contact.com',
      password: '12345678'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([user1, user2])
  })
})
