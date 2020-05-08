import ITemplateEngine from '../Core/ITemplateEngine';
import * as Handlebars from 'handlebars';
import { TemplateNotFound, TemplateParseError } from '../../Error/TemplateErrors';

export default class HandleBarsTemplateEngine implements ITemplateEngine{
    constructor(){
        this.preCompiledTemplateMap = new Map<string, HandlebarsTemplateDelegate<any>>();
    }
    /**
     * Registers the template with the template engine by compiling and storing the compiled method
     * TODO :: Add parials template support 
     * @param templateId - id used to store the precompiled template 
     * @param template - template to register
     * @param options - provide options such as partial or not
     */
    public registerTemplate(templateId: string, template: string, options?: JSON): void {
        // TODO :: Add parials template support using options 
        let preCompiledTemplate: HandlebarsTemplateDelegate;
        try{
            preCompiledTemplate = Handlebars.compile(template);
        } catch (error){
            throw new TemplateParseError(error.message);
        }
        this.preCompiledTemplateMap.set(templateId, preCompiledTemplate);
    }

    /**
     * Apply the template using the data provided 
     * @param templateId - id with which the compiled template is stored
     * @param dataModel - data to apply to the template
     */
    public applyTemplate(templateId: string, dataModel: JSON): string{
        const preCompiledTemplate = this.preCompiledTemplateMap.get(templateId);
        if(!preCompiledTemplate){
            throw new TemplateNotFound(`No template found for the given templateId : ${templateId}`);
        }
        return preCompiledTemplate(dataModel);
    }

    private preCompiledTemplateMap: Map<string, HandlebarsTemplateDelegate<any>>;
}