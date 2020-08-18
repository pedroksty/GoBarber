import IParseTEmplateEmailDTO from '../../MailTemplateProvider/dtos/IParseTemplateEmailDTO'

interface IMailContact {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParseTEmplateEmailDTO
}
