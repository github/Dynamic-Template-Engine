// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
import { TemplateType } from '../Core/TransformContract';

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
