import Transformer from "../Core/Transformer";
import EventTransformConfigEntry from "../Model/EventTransformConfigEntry";
import Utility from "../../Utility/Utility";
import { TemplateType } from "../Core/TransformContracts";
import TemplateEngineFactory from "../../Template/Core/TemplateEngineFactory";

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
    const key = this.templateKey(templateType, sourceType);
    return this.applyTemplate(templateType, key, eventData);
  }

  /**
   * Register a template with the correct engine based on the template config provided
   * *** Internal fucntion not exposed to outside the package ***
   * @internal
   * @param baseUrl - location of the template file 
   * @param transformConfig - config details of the template to register
   */
  public async registerTemplate(baseUrl: string, transformConfig: EventTransformConfigEntry): Promise<void> {
    const isHttpCall = baseUrl.length > 0;
    const basepath = isHttpCall ? `${baseUrl}/EventTemplate` : 'EventTemplate';
    const path = `${basepath}/${transformConfig.TemplateType}/${transformConfig.TemplateName}`;
    const templateFile = await Utility.fetchFile(isHttpCall, path);
    const templateEngine = TemplateEngineFactory.getInstance().getTemplateEngine(transformConfig.TemplateType);
    const key = this.templateKey(transformConfig.TemplateType, transformConfig.SourceType);
    templateEngine.registerTemplate(key, templateFile);
  }

  /**
   * Generates the unique key for a template, which can be provided to the template engine while registering and retrieving
   * @param templateType - template engine used ex. HandleBars, Liquid
   * @param sourceType - ex. PullRequest_Opened, Issue_opened
   */
  private templateKey(templateType: TemplateType, sourceType: string): string {
    return `${EventTransformer.KEY_PREFIX}.${templateType}.${sourceType}`;
  };

  private static KEY_PREFIX = 'evnt';
}