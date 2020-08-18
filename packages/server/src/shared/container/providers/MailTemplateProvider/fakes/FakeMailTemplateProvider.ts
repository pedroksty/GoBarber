import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTEmplateEmailDTO from '../dtos/IParseTemplateEmailDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables
  }: IParseTEmplateEmailDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
