import { TemplateType } from "../Core/TransformContracts";

export default interface BaseTransformConfigEntry{
  /**
   * The type of data source for which transformations needs to happen
   */
  SourceType: string;

  
  /** 
   * The type of template definition. For Example- HandleBars, Liquid, etc
   */
  TemplateType: TemplateType;

  /**
   * The name of the template file with extension
   */
  TemplateName: string;
}