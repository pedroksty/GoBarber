import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

describe('sendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUser = new SendForgotPasswordEmailService(fakeUserRepository);

    const user = await createUser.execute({});

    expect(user).toHaveProperty('id');
  });
});
