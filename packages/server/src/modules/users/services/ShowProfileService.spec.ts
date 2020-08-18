import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'

import ShowProfileService from './ShowProfileService'

let fakeUserRepository: FakeUserRepository
let showProfile: ShowProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()

    showProfile = new ShowProfileService(fakeUserRepository)
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Mario prato')
    expect(profile.email).toBe('mario@contact.com')
  })

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
