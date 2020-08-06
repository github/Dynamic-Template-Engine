import { TemplateType } from '../Core/TransformContract';

export default interface CustomEngineOptions{
  templateType: TemplateType,
  customHelpers?: {[helperName: string]: any},
  customTags?: {[tagName: string]: any},
}
