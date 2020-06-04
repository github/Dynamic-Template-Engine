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
    /**
     * Register a template with the correct engine based on the template config provided
     * *** Internal function not exposed to outside the package ***
     *
     * @param {boolean} fromRepo - is an from repo or a local machine lookup
     * @param {string} repo - repo with the config
     * @param {string} branch - branch with the config
     * @param {EventTransformConfigEntry} transformConfig - config details of the template to register
     * @param {string} accessToken - access token for private repo
     */
    registerTemplate(fromRepo: boolean, repo: string, branch: string, transformConfig: EventTransformConfigEntry, accessToken?: string): Promise<void>;
    private static KEY_PREFIX;
}
