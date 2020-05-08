import { TemplateType } from "../Core/TransformContract";

export default interface PartialTemplateConfigEntry{
  /**
   * The identifier for the template partial which can be used to embed in other templates. 
   */
  TemplateId: string;

  /**
   * The name of the template file with extension
   */
  TemplateName: string;

  /**
   * The type of template definition. For Example- HandleBars, Liquid, etc
   */
  TemplateType: TemplateType;
}