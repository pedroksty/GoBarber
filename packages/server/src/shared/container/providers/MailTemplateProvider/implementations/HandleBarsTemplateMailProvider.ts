import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IParseTEmplateEmailDTO from '../dtos/IParseTemplateEmailDTO'

class HandleBarsTEmplateMailProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables
  }: IParseTEmplateEmailDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}

export default HandleBarsTEmplateMailProvider
