import BaseTransformConfigEntry from "./BaseTransformConfigEntry";
import { ClientType } from "../Core/TransformContracts";

export default interface CardRendererConfigEntry extends BaseTransformConfigEntry{
  /**
   * The Client type for which card needs to be rendered. For Example- Teams, Slack, etc
   */
  ClientType: ClientType;
}