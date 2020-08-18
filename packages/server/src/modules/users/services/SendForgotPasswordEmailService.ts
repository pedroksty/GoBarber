import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersREpository'
import IMailProvider from '@shared/container/providers/MailProviver/models/IMailProvider'
import IUserTokenRepository from '../repositories/IUsersTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvder: IMailProvider,

    @inject('UserTokenRepository')
    private usersTokenRepository: IUserTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exits')
    }

    const { token } = await this.usersTokenRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvder.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService
