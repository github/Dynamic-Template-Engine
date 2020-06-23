/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
export default interface ITemplateEngine {
    /**
     * Registers the template with the template engine
     *
     * @param {string} templateId
     * @param {string} template
     * @param {JSON} options
     */
    registerTemplate(templateId: string, template: string, options?: JSON): void;
    /**
     * Apply the template using the data provided
     *
     * @param {string} templateId
     * @param {JSON} dataModel
     */
    applyTemplate(templateId: string, dataModel: JSON): string;
}
