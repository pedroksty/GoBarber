import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserSevice';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUserRepository);
    const authenticaetUser = new AuthenticateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    const response = await authenticaetUser.execute({
      email: 'mario@contact.com',
      password: '12345678'
    });

    expect(response).toHaveProperty('token');
  });
});
