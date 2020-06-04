import Transformer from '../Core/Transformer';
import { ClientType, TemplateType } from '../Core/TransformContract';
import CardRendererConfigEntry from '../Model/CardRendererConfigEntry';
/**
 *  Card Renderer provides ConstructCardJson method to render a card for different messaging clients
 */
export default class CardRenderer extends Transformer<CardRendererConfigEntry> {
    /**
     * Construct a card for messaging clients like slack, teams
     * using templates and provided event data
     *
     * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
     * @param {string} sourceType - ex. PullRequest_Opened, Issue_opened
     * @param {ClientType} clientType - client targeted ex. Teams, Slack
     * @param {any} eventJson - event data to plug in the template
     * @returns {string} rendered template as a string
     * @throws Error if unable to apply template
     */
    ConstructCardJson(templateType: TemplateType, sourceType: string, clientType: ClientType, eventJson: any): string;
    /**
     * Register a template with the correct engine based on the template config provided
     * *** Internal function not exposed to outside the package ***
     *
     * @param {boolean} fromRepo - is an from repo or a local machine lookup
     * @param {string} repo - repo with the config
     * @param {string} branch - branch with the config
     * @param {CardRendererConfigEntry} transformConfig - config details of the template to register
     * @param {string} accessToken - access token for private repo
     */
    registerTemplate(fromRepo: boolean, repo: string, branch: string, transformConfig: CardRendererConfigEntry, accessToken?: string): Promise<void>;
    private static KEY_PREFIX;
}
