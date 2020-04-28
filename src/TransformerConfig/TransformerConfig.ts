import CardRendererConfigEntry from "../Transformer/CardRenderer/CardRendererConfigEntry";
import EventTransformConfigEntry from "../Transformer/EventTransformer/EventTransformConfigEntry";
import PartialTemplateConfigEntry from "../Transformer/PartialTemplateConfigEntry";

export default interface TransformerConfig{
  cardRenderers: CardRendererConfigEntry[];
  
  partials: PartialTemplateConfigEntry[];
  
  eventTransformers: EventTransformConfigEntry[];
}