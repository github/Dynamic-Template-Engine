// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
import Transformer from '../Core/Transformer';
import { ClientType, TemplateType } from '../Core/TransformContract';
import CardRendererConfigEntry from '../Model/CardRendererConfigEntry';
import Utility from '../../Utility/Utility';
import { TemplateNotFound, TemplateEngineNotFound, TemplateRenderError } from '../../Error/TemplateError';

/**
 *  Card Renderer provides ConstructCardJson method to render a card for different messaging clients.
 */
export default class CardRenderer extends Transformer<CardRendererConfigEntry> {
  /**
   * Construct a card for messaging clients like slack, teams
   * using templates and provided event data.
   *
   * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
   * @param {string} sourceType - ex. PullRequest_Opened, Issue_opened
   * @param {ClientType} clientType - client targeted ex. Teams, Slack
   * @param {any} eventJson - event data to plug in the template
   * @returns {string} rendered template as a string
   * @throws Error if unable to apply template
   */
  public ConstructCardJson(templateType: TemplateType,
    sourceType: string, clientType: ClientType, eventJson: any): string {
    const key = Utility.keyGenerator(CardRenderer.KEY_PREFIX, templateType, sourceType, clientType);
    try {
      return this.applyTemplate(templateType, key, eventJson);
    } catch (error) {
      if (error instanceof TemplateNotFound) {
        throw new TemplateNotFound(`No template found for Template Type: ${templateType}, Source Type: ${sourceType} and Client Type: ${clientType}`);
      } else if (error instanceof TemplateEngineNotFound) {
        throw error;
      } else {
        throw new TemplateRenderError(`Error applying template for Template Type: ${templateType}, Source Type: ${sourceType} and Client Type: ${clientType} with error message ${error.message}`);
      }
    }
  }

  /**
   * Register a template with the correct engine based on the template config provided.
   * *** Internal function not exposed outside the package ***
   *
   * @internal
   * @param {string} baseUrl - location of the template file
   * @param {CardRendererConfigEntry} transformConfig - config details of the template to register
   */
  public async registerTemplate(baseUrl: string,
    transformConfig: CardRendererConfigEntry): Promise<void> {
    const isHttpCall = baseUrl.startsWith('https://');
    const basepath = `${baseUrl}/CardTemplate`;
    const path = `${basepath}/${transformConfig.ClientType}/${transformConfig.TemplateType}/${transformConfig.TemplateName}`;
    const key = Utility.keyGenerator(CardRenderer.KEY_PREFIX, transformConfig.TemplateType,
      transformConfig.SourceType, transformConfig.ClientType);
    await this.readAndRegisterTemplate(isHttpCall, path, key, transformConfig.TemplateType);
  }

  private static KEY_PREFIX = 'card';
}
