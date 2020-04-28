import { TemplateType, SourceType } from "./TransformContracts";

export default interface BaseTransformConfigEntry{
  // <summary>
  // The type of data source for which transformations needs to happen
  // </summary>
  SourceType: SourceType;

  // <summary>
  // The type of template definition. For Example- HandleBars, Liquid, etc
  // </summary>
  TemplateType: TemplateType;

  // <summary>
  // The name of the template file with extension
  // </summary>
  TemplateName: string;
}