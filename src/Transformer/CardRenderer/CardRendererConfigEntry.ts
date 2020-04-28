import BaseTransformConfigEntry from "../BaseTransformConfigEntry";
import { ClientType } from "../TransformContracts";

export default interface CardRendererConfigEntry extends BaseTransformConfigEntry{
  // <summary>
  // The Client type for which card needs to be rendered. For Example- Teams, Slack, etc
  // </summary>
  ClientType: ClientType;
}