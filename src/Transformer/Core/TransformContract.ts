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
  Slack = 'Slack',
  none = 'none',
}
