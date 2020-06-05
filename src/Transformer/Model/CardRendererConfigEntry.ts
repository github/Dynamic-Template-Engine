/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
import BaseTransformConfigEntry from './BaseTransformConfigEntry';
import { ClientType } from '../Core/TransformContract';

export default interface CardRendererConfigEntry extends BaseTransformConfigEntry{
  /**
   * The Client type for which card needs to be rendered. For Example- Teams, Slack, etc
   */
  ClientType: ClientType;
}
