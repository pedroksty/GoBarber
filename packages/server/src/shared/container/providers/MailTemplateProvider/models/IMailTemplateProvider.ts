import IParseTEmplateEmailDTO from '../dtos/IParseTemplateEmailDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseTEmplateEmailDTO): Promise<string>;
}
