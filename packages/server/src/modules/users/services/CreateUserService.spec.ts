import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'Mario Prato',
      email: 'mario@contact.com',
      password: '12345678'
    });

    expect(user).toHaveProperty('id');
  });
});
