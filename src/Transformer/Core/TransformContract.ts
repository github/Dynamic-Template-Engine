// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
/**
 * The type of template definition. For Example- HandleBars, Liquid, etc
 */
export enum TemplateType {
  HandleBars = 'HandleBars',
  Liquid = 'Liquid',
}

/**
 * The client for which the event card needs to be rendered
 */
export enum ClientType {
  Teams = 'Teams',
}
