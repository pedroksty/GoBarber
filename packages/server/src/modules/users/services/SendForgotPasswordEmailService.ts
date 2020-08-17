import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersREpository';
import IMailProvider from '@shared/container/providers/MailProviver/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
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
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exits');
    }

    await this.usersTokenRepository.generate(user.id);

    await this.mailProvder.sendMail(
      email,
      'Pedido de recuperação de senha recebido'
    );
  }
}

export default SendForgotPasswordEmailService;
