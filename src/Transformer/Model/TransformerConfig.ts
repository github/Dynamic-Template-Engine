import CardRendererConfigEntry from './CardRendererConfigEntry';
import EventTransformConfigEntry from './EventTransformConfigEntry';
import PartialTemplateConfigEntry from './PartialTemplateConfigEntry';

export default interface TransformerConfig{
  cardRenderer: CardRendererConfigEntry[];

  partials: PartialTemplateConfigEntry[];

  eventTransformer: EventTransformConfigEntry[];
}
