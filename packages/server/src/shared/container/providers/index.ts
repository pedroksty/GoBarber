import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProviver/models/IMailProvider'
import EtherealMailProvider from './MailProviver/implementations/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandleBarsTEmplateMailProvider from './MailTemplateProvider/implementations/HandleBarsTemplateMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsTEmplateMailProvider
)
