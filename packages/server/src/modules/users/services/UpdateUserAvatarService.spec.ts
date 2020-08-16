import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-id',
        avatarFileName: 'avatar.png'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Mario prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('avatar2.png');
  });
});
