import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProviver/models/IMailProvider'
import EtherealMailProvider from './MailProviver/implementations/EtherealMailProvider'
import SESMailProvider from './MailProviver/implementations/SESMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandleBarsTEmplateMailProvider from './MailTemplateProvider/implementations/HandleBarsTemplateMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsTEmplateMailProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
)
