import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserSevice';
import CreateUserService from './CreateUserService';

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
});
