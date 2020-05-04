import TemplateEngineFactory from '../../Template/Core/TemplateEngineFactory';
import { TemplateType } from './TransformContracts';
import ITemplateEngine from '../../Template/Core/ITemplateEngine';
import BaseTransformConfigEntry from '../Model/BaseTransformConfigEntry';
import Utility from '../../Utility/Utility';

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
   * Fetch template file and register with appropriate template engine
   * @param isHttpCall - boolean
   * @param path - url/local path for the template file
   * @param key - template key to use, to register template
   * @param templateType - type of templating engine ex. Handlebars, Liquid
   */
  protected async readAndRegisterTemplate(isHttpCall: boolean, path: string, key: string, templateType: TemplateType){
    const templateFile = await Utility.fetchFile(isHttpCall, path);
    const templateEngine = TemplateEngineFactory.getInstance().getTemplateEngine(templateType);
    templateEngine.registerTemplate(key, templateFile);
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal function not exposed to outside the package ***
   * @internal
   * @param baseUrl - location of the template file 
   * @param transformConfig - config details of the template to register
   */
  public abstract async registerTemplate(baseUrl: string,transformConfig: T): Promise<void>;
}