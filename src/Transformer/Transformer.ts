import TemplateEngineFactory from '../Templating/TemplateEngineFactory';
import { TemplateType, SourceType, ClientType } from './TransformContracts';
import ITemplateEngine from '../Templating/ITemplateEngine';

export default class Transformer {
  // calls the right templating engine and uses the same to render the template inserting the data from the data object
  public applyTemplate(templateType: TemplateType, templateId: string, dataObject: JSON): string {
    let templateEngine: ITemplateEngine;
    try {
      templateEngine = TemplateEngineFactory.getTemplateEngine(templateType);
      return templateEngine.applyTemplate(templateId, dataObject);
    } catch (error) {
      throw error;
    }
  }


}