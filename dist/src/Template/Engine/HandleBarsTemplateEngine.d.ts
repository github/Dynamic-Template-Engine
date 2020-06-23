import ITemplateEngine from '../Core/ITemplateEngine';
export default class HandleBarsTemplateEngine implements ITemplateEngine {
    constructor();
    /**
     * Registers the template with the template engine by compiling and storing the compiled method
     * TODO :: Add parials template support
     *
     * @param {string} templateId - id used to store the precompiled template
     * @param {string} template - template to register
     * @param {JSON} options - provide options such as partial or not
     */
    registerTemplate(templateId: string, template: string, options?: JSON): void;
    /**
     * Apply the template using the data provided
     *
     * @param {string} templateId - id with which the compiled template is stored
     * @param {JSON} dataModel - data to apply to the template
     */
    applyTemplate(templateId: string, dataModel: JSON): string;
    private preCompiledTemplateMap;
}
