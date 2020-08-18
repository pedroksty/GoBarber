import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import UpdateUserAvatarService from './UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )
  })

  it('should be able to update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    })

    expect(user.avatar).toBe('avatar.png')
  })

  it('should not be able to update avatar with non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-id',
        avatarFileName: 'avatar.png'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.png')

    expect(user.avatar).toBe('avatar2.png')
  })
})
