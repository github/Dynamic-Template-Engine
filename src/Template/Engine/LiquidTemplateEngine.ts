/** @copyright Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
import {
  Liquid, Template, FilterImplOptions, TagImplOptions,
} from 'liquidjs';
import { CustomHelperRegisterError, CustomTagRegisterError } from '../../Error/FunctionalityError';
import ITemplateEngine from '../Core/ITemplateEngine';
import { TemplateNotFound, TemplateParseError } from '../../Error/TemplateError';

export default class LiquidTemplateEngine implements ITemplateEngine {
  constructor() {
    this.preCompiledTemplateMap = new Map<string, Template[]>();
    this.engine = new Liquid();
  }

  /**
   * Registers the template with the template engine by compiling and storing the compiled method
   * TODO :: Add parials template support using options
   *
   * @param {string} templateId - id used to store the precompiled template
   * @param {string} template - template to register
   * @param {JSON} options - provide options such as partial or not
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public registerTemplate(templateId: string, template: string, options?: JSON): void {
    // TODO :: Add parials template support using options
    let preCompiledTemplate: Template[] = [];
    try {
      preCompiledTemplate = this.engine.parse(template);
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
    return this.engine.renderSync(preCompiledTemplate, dataModel);
  }

  /**
   * Register custom helper functions with template engine
   *
   * @param helperName name of the helper to register
   * @param callBack the implementation of helper function
   */
  // eslint-disable-next-line class-methods-use-this
  public registerHelper(helperName: string, helperFn: FilterImplOptions): void {
    try {
      this.engine.registerFilter(helperName, helperFn);
    } catch (error) {
      throw new CustomHelperRegisterError(`Registeration of custom helper: ${helperName} failed with ERROR: ${error.message} `);
    }
  }

  /**
   * Register custom tag with template enigne
   *
   * @param tagName name of the tag to register
   * @param tagOptions tagOptions specific to the template engine
   */
  // eslint-disable-next-line class-methods-use-this
  public registerTag(tagName: string, tagOptions: TagImplOptions): void {
    try {
      this.engine.registerTag(tagName, tagOptions);
    } catch (error) {
      throw new CustomTagRegisterError(`Registeration of custom Tag: ${tagName} failed with ERROR: ${error.message}`);
    }
  }

  private engine: Liquid;
  private preCompiledTemplateMap: Map<string, Template[]>;
}
