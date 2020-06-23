/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
/* eslint-disable class-methods-use-this */
import TemplateEngineFactory from '../../Template/Core/TemplateEngineFactory';
import { TemplateType } from './TransformContract';
import BaseTransformConfigEntry from '../Model/BaseTransformConfigEntry';
import Utility from '../../Utility/Utility';

export default abstract class Transformer<T extends BaseTransformConfigEntry> {
  /**
   * calls the right templating engine and uses the same to render
   * the template inserting the data from the data object
   *
   * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
   * @param {string} templateKey - template key with which the template is stored
   * @param {JSON} dataObject - data to be applied to the template
   */
  protected applyTemplate(templateType: TemplateType,
    templateKey: string, dataObject: JSON): string {
    const templateEngine = TemplateEngineFactory.getInstance().getTemplateEngine(templateType);
    return templateEngine.applyTemplate(templateKey, dataObject);
  }

  /**
   * Fetch template file and register with appropriate template engine
   *
   * @param {boolean} fromRepo - is an from repo or a local machine lookup
   * @param {string} repo - repo with the config
   * @param {string} branch - branch with the config
   * @param {string} path - url/local path for the template file
   * @param {string} key - template key to use, to register template
   * @param {TemplateType} templateType - type of templating engine ex. Handlebars, Liquid
   * @param {string} accessToken - access token for private repo
   */
  protected async readAndRegisterTemplate(fromRepo: boolean, repo:string, branch:string,
    path: string, key: string, templateType: TemplateType, accessToken?: string) {
    const templateFile = await Utility.fetchFile(fromRepo, repo, branch, path, accessToken);
    const templateEngine = TemplateEngineFactory.getInstance().getTemplateEngine(templateType);
    templateEngine.registerTemplate(key, templateFile);
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal function not exposed to outside the package ***
   *
   * @param {boolean} fromRepo - is an from repo or a local machine lookup
   * @param {string} repo - repo with the config
   * @param {string} branch - branch with the config
   * @param {BaseTransformConfigEntry} transformConfig - config
   * @param {string} accessToken - access token for private repo
   * details of the template to register
   */
  public abstract async registerTemplate(fromRepo: boolean, repo:string, branch:string,
    transformConfig: T, accessToken?: string): Promise<void>;
}
