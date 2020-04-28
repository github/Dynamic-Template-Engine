import ITemplateEngine from './../ITemplateEngine';
import * as Handlebars from 'handlebars';

export default class HandleBarsTemplateEngine implements ITemplateEngine{
    public registerTemplate(template: string, options?: JSON): string {
        //throw new Error("Method not implemented.");
        return Math.random()*100 + "";
    }

    public applyTemplate(templateId: string, dataModel: JSON): string {
        //throw new Error("Method not implemented.");
        return "";
    }

    
}