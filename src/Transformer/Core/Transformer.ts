import TemplateEngineFactory from '../../Template/Core/TemplateEngineFactory';
import { TemplateType } from './TransformContracts';
import ITemplateEngine from '../../Template/Core/ITemplateEngine';
import BaseTransformConfigEntry from '../Model/BaseTransformConfigEntry';

export default abstract class Transformer<T extends BaseTransformConfigEntry> {
  /**
   * calls the right templating engine and uses the same to render the template inserting the data from the data object
   * @param templateType - template engine to use ex. HandleBars, Liquid
   * @param templateKey - template key with which the template is stored
   * @param dataObject - data to be applied to the template
   */
  protected applyTemplate(templateType: TemplateType, templateKey: string, dataObject: JSON): string {
    let templateEngine: ITemplateEngine;
    try {
      templateEngine = TemplateEngineFactory.getInstance().getTemplateEngine(templateType);
      return templateEngine.applyTemplate(templateKey, dataObject);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal fucntion not exposed to outside the package ***
   * @internal
   * @param baseUrl - location of the template file 
   * @param transformConfig - config details of the template to register
   */
  public abstract async registerTemplate(baseUrl: string,transformConfig: T): Promise<void>;
}