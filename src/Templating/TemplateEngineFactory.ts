import HandleBarsTemplateEngine from './Engines/HandleBarsTemplateEngine';
import ITemplateEngine from './ITemplateEngine';
import TemplateEngineConfig from './TemplateEngineConfig';
import { TemplateType } from '../Transformer/TransformContracts';

export default class TemplateEngineFactory{
    private static templateEngineMap : Map<TemplateType, ITemplateEngine> = new Map<TemplateType, ITemplateEngine>();
    private static isInitialized : boolean = false;

    public static initialize(){
        if(this.isInitialized){
            return;
        }
        for(let templateEngine of TemplateEngineConfig.templateEngineList){
            let templateEngineClass = templateEngine.templateEngine;
            this.templateEngineMap.set(templateEngine.templateType, new templateEngineClass());
        }
        this.isInitialized = true;
    }

    public static getTemplateEngine(templateType: TemplateType): ITemplateEngine{
        if(!this.templateEngineMap.has(templateType)){
            throw new Error("No template engine present for the TemplateType");
        }
        return this.templateEngineMap.get(templateType)!;
    }
}