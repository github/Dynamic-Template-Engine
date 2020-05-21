import Transformer from '../Core/Transformer';
import EventTransformConfigEntry from '../Model/EventTransformConfigEntry';
import { TemplateType } from '../Core/TransformContract';
/**
 * EventTransformer provides ConstructEventJson method to render
 * a template with provided event data
 */
export default class EventTransformer extends Transformer<EventTransformConfigEntry> {
    /**
     * Construct a new Event Json using template and provided event data
     *
     * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
     * @param {string} sourceType - ex. PullRequest_Opened, Issue_opened
     * @param {JSON} eventJson - event data to plug in the template
     * @returns {string} rendered template as a string
     * @throws Error if unable to apply template
     */
    ConstructEventJson(templateType: TemplateType, sourceType: string, eventJson: any): string;
    private static KEY_PREFIX;
}
