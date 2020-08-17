import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUsersTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: '123123'
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
