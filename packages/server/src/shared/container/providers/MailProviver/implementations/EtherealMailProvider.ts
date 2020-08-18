import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  public async sendMail({ to, subject, from }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      text: 'teste'
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL : %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
