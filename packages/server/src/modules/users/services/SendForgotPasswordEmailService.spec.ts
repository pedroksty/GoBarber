import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeMailProvider from '@shared/container/providers/MailProviver/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'
import FakeUserTokenRepository from '../repositories/fakes/FakeUsersTokenRepository'

let fakeUserRepository: FakeUserRepository
let fakeMailProvider: FakeMailProvider
let fakeUsersTokenRepository: FakeUserTokenRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('sendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokenRepository = new FakeUserTokenRepository()
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    )
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
    await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    })

    await sendForgotPasswordEmail.execute({
      email: 'mario@contac.com'
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'mario@contac.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate')
    const user = await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    })

    await sendForgotPasswordEmail.execute({
      email: 'mario@contac.com'
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
