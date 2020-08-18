import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ResetPasswordService from './ResetPasswordService'
import AppError from '@shared/errors/AppError'
import FakeUserTokenRepository from '../repositories/fakes/FakeUsersTokenRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeUserRepository: FakeUserRepository
let fakeUsersTokenRepository: FakeUserTokenRepository
let resetPassword: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUsersTokenRepository = new FakeUserTokenRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    })

    const { token } = await fakeUsersTokenRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      token,
      password: '123123'
    })

    const updatedUser = await fakeUserRepository.findById(user.id)

    expect(generateHash).toBeCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate(
      'non-existing-user'
    )

    await expect(
      resetPassword.execute({
        token,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    })

    const { token } = await fakeUsersTokenRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        token,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
