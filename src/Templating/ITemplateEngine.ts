
/* 
* Interface to implement a template engine.
* This will allow adding support for various template engines and languanges
* e.g. Handlebars, Liquid, etc.
*/
export default interface ITemplateEngine{
    
    applyTemplate(templateId: string, dataModel: JSON): string;

    registerTemplate(template: string, options?: JSON): string;
}