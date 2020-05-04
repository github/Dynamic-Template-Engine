import Transformer from '../Core/Transformer';
import { ClientType, TemplateType } from '../Core/TransformContracts';
import CardRendererConfigEntry from '../Model/CardRendererConfigEntry';
import Utility from '../../Utility/Utility';

/**
 *  Card Renderer provides ConstructCardJson method to render a card for different messaging clients
 */
export class CardRenderer extends Transformer<CardRendererConfigEntry>{
  /**
   * Construct a card for messaging clients like slack, teams using templates and provided event data
   * @param templateType - template engine to use ex. HandleBars, Liquid
   * @param sourceType - ex. PullRequest_Opened, Issue_opened
   * @param clientType - client targeted ex. Teams, Slack
   * @param eventJson - event data to plug in the template
   */
  public ConstructCardJson(templateType: TemplateType, sourceType: string, clientType: ClientType, eventJson: any): string {
    // TODO: Validations for inputs -
    // sourceType, clientType and eventJson to be a valid json 
    const key = Utility.keyGenerator(CardRenderer.KEY_PREFIX, templateType, sourceType, clientType);
    return this.applyTemplate(templateType, key, eventJson);
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal function not exposed to outside the package ***
   * @internal
   * @param baseUrl - location of the template file 
   * @param transformConfig - config details of the template to register
   */
  public async registerTemplate(baseUrl: string, transformConfig: CardRendererConfigEntry): Promise<void> {
    const isHttpCall = baseUrl.length > 0;
    const basepath = isHttpCall ? `${baseUrl}/CardTemplate` : 'CardTemplate';
    const path = `${basepath}/${transformConfig.ClientType}/${transformConfig.TemplateType}/${transformConfig.TemplateName}`;
    const key = Utility.keyGenerator(CardRenderer.KEY_PREFIX, transformConfig.TemplateType, transformConfig.SourceType, transformConfig.ClientType);
    await this.readAndRegisterTemplate(isHttpCall, path, key, transformConfig.TemplateType);
  }

  private static KEY_PREFIX = 'card';

}
