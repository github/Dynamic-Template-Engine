// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
import { TemplateType } from '../Core/TransformContract';
/**
 * @typedef {object} BaseTransformConfigEntry
 * @property {string} SourceType The source type of the transform.
 * @property {TemplateType} TemplateType The template type of the transform.
 * @property {string} TemplateName The template name of the transform.
 */
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
