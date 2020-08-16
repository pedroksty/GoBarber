import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserSevice';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticaetUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    const response = await authenticaetUser.execute({
      email: 'mario@contact.com',
      password: '12345678'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticaetUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticaetUser.execute({
        email: 'mario@contact.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticaetUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    expect(
      authenticaetUser.execute({
        email: 'mario@contact.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
