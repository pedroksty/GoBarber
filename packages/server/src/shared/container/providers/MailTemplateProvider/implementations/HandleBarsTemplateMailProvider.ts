import handlebars from 'handlebars'

import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IParseTEmplateEmailDTO from '../dtos/IParseTemplateEmailDTO'

class HandleBarsTEmplateMailProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables
  }: IParseTEmplateEmailDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}

export default HandleBarsTEmplateMailProvider
