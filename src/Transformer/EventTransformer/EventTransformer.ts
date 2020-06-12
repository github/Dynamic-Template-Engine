// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
import Transformer from '../Core/Transformer';
import EventTransformConfigEntry from '../Model/EventTransformConfigEntry';
import Utility from '../../Utility/Utility';
import { TemplateType } from '../Core/TransformContract';
import { TemplateNotFound, TemplateEngineNotFound, TemplateRenderError } from '../../Error/TemplateError';

/**
 * EventTransformer provides ConstructEventJson method to render
 * a template with provided event data
 */
export default class EventTransformer extends Transformer<EventTransformConfigEntry> {
  /**
   * Construct a new Event Json using template and provided event data
   *
   * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
   * @param {string} sourceType - ex. PullRequest_Opened, Issue_opened
   * @param {JSON} eventJson - event data to plug in the template
   * @returns {string} rendered template as a string
   * @throws Error if unable to apply template
   */
  public ConstructEventJson(templateType: TemplateType,
    sourceType: string, eventJson: any): string {
    const key = Utility.keyGenerator(EventTransformer.KEY_PREFIX, templateType, sourceType);
    try {
      return this.applyTemplate(templateType, key, eventJson);
    } catch (error) {
      if (error instanceof TemplateNotFound) {
        throw new TemplateNotFound(`No template found for Template Type: ${templateType} and Source Type: ${sourceType}`);
      } else if (error instanceof TemplateEngineNotFound) {
        throw error;
      } else {
        throw new TemplateRenderError(`Error applying template for Template Type: ${templateType} 
        and Source Type: ${sourceType} with error message ${error.message}`);
      }
    }
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal function not exposed to outside the package ***
   *
   * @internal
   * @param {string} baseUrl - location of the template file
   * @param {EventTransformConfigEntry} transformConfig - config details of the template to register
   */
  public async registerTemplate(baseUrl: string,
    transformConfig: EventTransformConfigEntry): Promise<void> {
    const isHttpCall = baseUrl.length > 0;
    const basepath = isHttpCall ? `${baseUrl}/EventTemplate` : 'EventTemplate';
    const path = `${basepath}/${transformConfig.TemplateType}/${transformConfig.TemplateName}`;
    const key = Utility.keyGenerator(EventTransformer.KEY_PREFIX,
      transformConfig.TemplateType, transformConfig.SourceType);
    await this.readAndRegisterTemplate(isHttpCall, path, key, transformConfig.TemplateType);
  }

  private static KEY_PREFIX = 'event';
}
