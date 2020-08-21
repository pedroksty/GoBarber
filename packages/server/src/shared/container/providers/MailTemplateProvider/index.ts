import { container } from 'tsyringe'

import IMailTemplateProvider from './models/IMailTemplateProvider'

import HandleBarsTemplateMailProvider from './implementations/HandleBarsTemplateMailProvider'

const providers = {
  handlebars: HandleBarsTemplateMailProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)
