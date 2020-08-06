// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
import * as Handlebars from 'handlebars';
import { FunctionalityNotSupportedError, CustomHelperRegisterError } from '../../Error/FunctionalityError';
import ITemplateEngine from '../Core/ITemplateEngine';
import { TemplateNotFound, TemplateParseError } from '../../Error/TemplateError';

export default class HandleBarsTemplateEngine implements ITemplateEngine {
  constructor() {
    this.preCompiledTemplateMap = new Map<string, HandlebarsTemplateDelegate<any>>();
  }

  /**
   * Registers the template with the template engine by compiling and storing the compiled method.
   * TODO :: Add parials template support
   *
   * @param {string} templateId - id used to store the precompiled template
   * @param {string} template - template to register
   * @param {JSON} options - provide options such as partial or not
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public registerTemplate(templateId: string, template: string, options?: JSON): void {
    // TODO :: Add parials template support using options
    let preCompiledTemplate: HandlebarsTemplateDelegate;
    try {
      preCompiledTemplate = Handlebars.compile(template);
    } catch (error) {
      throw new TemplateParseError(error.message);
    }
    this.preCompiledTemplateMap.set(templateId, preCompiledTemplate);
  }

  /**
   * Apply the template using the data provided.
   *
   * @param {string} templateId - id with which the compiled template is stored
   * @param {JSON} dataModel - data to apply to the template
   */
  public applyTemplate(templateId: string, dataModel: JSON): string {
    const preCompiledTemplate = this.preCompiledTemplateMap.get(templateId);
    if (!preCompiledTemplate) {
      throw new TemplateNotFound(`No template found for the given templateId : ${templateId}`);
    }
    return preCompiledTemplate(dataModel);
  }

  /**
   * Register custom helper functions with template engine.
   *
   * @param helperName name of the helper to register
   * @param helperFunc the implementation of helper function
   */
  // eslint-disable-next-line class-methods-use-this
  public registerHelper(helperName: string, helperFunc: Handlebars.HelperDelegate): void {
    try {
      Handlebars.registerHelper(helperName, helperFunc);
    } catch (error) {
      throw new CustomHelperRegisterError(`Registration of custom helper: ${helperName} failed with ERROR: ${error.message} `);
    }
  }

  /**
   * Register custom tag with template engine.
   *
   * @throws FunctionalityNotSupportedError if the engine does not support custom tags/extensions
   */
  // eslint-disable-next-line class-methods-use-this
  public registerTag(): void {
    throw new FunctionalityNotSupportedError('HandleBars does not support custom tags or extensions');
  }

  private preCompiledTemplateMap: Map<string, HandlebarsTemplateDelegate<any>>;
}
