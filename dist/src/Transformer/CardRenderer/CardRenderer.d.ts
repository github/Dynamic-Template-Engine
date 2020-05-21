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
    private static KEY_PREFIX;
}
