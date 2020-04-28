import { TemplateType, SourceType, ClientType } from "../Transformer/TransformContracts";
import { CardRenderer } from "../Transformer/CardRenderer/CardRenderer";
import TemplateEngineFactory from "../Templating/TemplateEngineFactory";

export default class TemplateRegistrationHelper {

  private static templateMap: Map<string, string> = new Map<string, string>();

  public static registerCardRenderer(templateType: TemplateType, sourceType: SourceType, clientType: ClientType, template: string){
    const templateId = this.registerTemplate(templateType, template);
    const templateKey = CardRenderer.templateKey(templateType, sourceType, clientType);
    this.templateMap.set(templateKey, templateId);
  }

  public static getTemplateId(templateKey: string): string{
    const templateId = this.templateMap.get(templateKey);
    if (!templateId){
        throw new Error(`No template registered for Template key: ${templateKey}`);
    }
    return templateId;
  }

  // TODO :: remove method, only for testing locally
  public static printTemplateMap(){
    console.log("Printing TemplateMap")
    this.templateMap.forEach((value, key)=>{
        console.log(`${key}: ${value}`);
    });
}

  private static registerTemplate(templateType: TemplateType, template: string, options?: JSON): string{
    let templateEngine;
    try {
        templateEngine = TemplateEngineFactory.getTemplateEngine(templateType);
    } catch (error) {
        throw error;
    }
    return templateEngine.registerTemplate(template, options);
}
}