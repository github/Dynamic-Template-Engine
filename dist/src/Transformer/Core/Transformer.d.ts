import { TemplateType } from './TransformContract';
import BaseTransformConfigEntry from '../Model/BaseTransformConfigEntry';
export default abstract class Transformer<T extends BaseTransformConfigEntry> {
    /**
     * calls the right templating engine and uses the same to render
     * the template inserting the data from the data object
     *
     * @param {TemplateType} templateType - template engine to use ex. HandleBars, Liquid
     * @param {string} templateKey - template key with which the template is stored
     * @param {JSON} dataObject - data to be applied to the template
     */
    protected applyTemplate(templateType: TemplateType, templateKey: string, dataObject: JSON): string;
    /**
     * Fetch template file and register with appropriate template engine
     *
     * @param {boolean} isHttpCall - boolean
     * @param {string} path - url/local path for the template file
     * @param {string} key - template key to use, to register template
     * @param {TemplateType} templateType - type of templating engine ex. Handlebars, Liquid
     */
    protected readAndRegisterTemplate(isHttpCall: boolean, path: string, key: string, templateType: TemplateType): Promise<void>;
}
