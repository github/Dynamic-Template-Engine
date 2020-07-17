// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
/**
 * Interface to implement a template engine.
 * This will allow adding support for various template engines and languages
 * e.g. Handlebars, Liquid, etc.
 */
export default interface ITemplateEngine {

  /**
   * Registers the template with the template engine
   *
   * @param {string} templateId
   * @param {string} template
   * @param {JSON} options
   */
  registerTemplate(templateId: string, template: string, options?: JSON): void;

  /**
   * Apply the template using the data provided
   *
   * @param {string} templateId
   * @param {JSON} dataModel
   */
  applyTemplate(templateId: string, dataModel: JSON): string;

  /**
   * Register custom helper functions with template engine
   *
   * @param helperName name of the helper to register
   * @param callBack the implementation of helper function
   * @throws FunctionalityNotSupportedError if the engine does not support custom helpers/filters
   */
  registerHelper(helperName: string, helperFn : any): void;

  /**
   * Register custom tag with template enigne
   *
   * @param tagName name of the tag to register
   * @param tagOptions tagOptions specific to the template engine
   * @throws FunctionalityNotSupportedError if the engine does not support custom tags/extensions
   */
  registerTag(tagName: string, tagOptions: any): void;
}
