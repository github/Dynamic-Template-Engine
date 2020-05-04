
/* 
* Interface to implement a template engine.
* This will allow adding support for various template engines and languanges
* e.g. Handlebars, Liquid, etc.
*/
export default interface ITemplateEngine{
    /**
     * 
     * @param templateId 
     * @param dataModel 
     */
    applyTemplate(templateId: string, dataModel: JSON): string;

    /**
     * 
     * @param templateId 
     * @param template 
     * @param options 
     */
    registerTemplate(templateId:string, template: string, options?: JSON): void;
}