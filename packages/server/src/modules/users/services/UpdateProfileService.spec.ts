import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import UpdateProfileService from './UpdateProfileService'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mario Doe',
      email: 'doe@contact.com'
    })

    expect(updatedUser.name).toBe('Mario Doe')
    expect(updatedUser.email).toBe('doe@contact.com')
  })

  it('should not be able to  change to another  user email', async () => {
    await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'test@contact.com',
      password: '12345678'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mario Doe',
        email: 'mario@contact.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
