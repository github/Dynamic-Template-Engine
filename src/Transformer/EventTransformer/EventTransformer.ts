import Transformer from "../Core/Transformer";
import EventTransformConfigEntry from "../Model/EventTransformConfigEntry";
import Utility from "../../Utility/Utility";
import { TemplateType } from "../Core/TransformContracts";

/**
 *  EventTransformer provides ConstructEventJson method to render a template with provided event data
 */
export default class EventTransformer extends Transformer<EventTransformConfigEntry>{
  /**
   * Construct a new Event Json using template and provided event data
   * @param templateType - template engine to use ex. HandleBars, Liquid
   * @param sourceType - ex. PullRequest_Opened, Issue_opened
   * @param eventJson - event data to plug in the template
   */
  public ConstructEventJson(templateType: TemplateType, sourceType: string, eventData: any): string {
    // TODO: Validations for inputs -
    // sourceType and eventData to be a valid json 
    const key = Utility.keyGenerator(EventTransformer.KEY_PREFIX, templateType, sourceType);
    return this.applyTemplate(templateType, key, eventData);
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal function not exposed to outside the package ***
   * @internal
   * @param baseUrl - location of the template file 
   * @param transformConfig - config details of the template to register
   */
  public async registerTemplate(baseUrl: string, transformConfig: EventTransformConfigEntry): Promise<void> {
    const isHttpCall = baseUrl.length > 0;
    const basepath = isHttpCall ? `${baseUrl}/EventTemplate` : 'EventTemplate';
    const path = `${basepath}/${transformConfig.TemplateType}/${transformConfig.TemplateName}`;
    const key = Utility.keyGenerator(EventTransformer.KEY_PREFIX, transformConfig.TemplateType, transformConfig.SourceType);
    await this.readAndRegisterTemplate(isHttpCall, path, key, transformConfig.TemplateType);
  }

  private static KEY_PREFIX = 'event';
}