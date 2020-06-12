// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
import * as Handlebars from 'handlebars';
import ITemplateEngine from '../Core/ITemplateEngine';
import { TemplateNotFound, TemplateParseError } from '../../Error/TemplateError';

export default class HandleBarsTemplateEngine implements ITemplateEngine {
  constructor() {
    this.preCompiledTemplateMap = new Map<string, HandlebarsTemplateDelegate<any>>();
  }
  /**
   * Registers the template with the template engine by compiling and storing the compiled method
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
   * Apply the template using the data provided
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

  private preCompiledTemplateMap: Map<string, HandlebarsTemplateDelegate<any>>;
}
