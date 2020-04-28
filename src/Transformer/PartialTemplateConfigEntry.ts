import { TemplateType } from "./TransformContracts";

export default interface PartialTemplateConfigEntry{
  // <summary>
  // The identifier for the template partial which can be used to embed in other templates. 
  // </summary>
  TemplateId: string;

  // <summary>
  // The name of the template file with extension
  // </summary>
  TemplateName: string;

  // <summary>
  // The type of template definition. For Example- HandleBars, Liquid, etc
  // </summary>
  TemplateType: TemplateType;
}