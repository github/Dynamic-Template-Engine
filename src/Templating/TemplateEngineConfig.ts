import { TemplateType } from "../Transformer/TransformContracts";
import HandleBarsTemplateEngine from "./Engines/HandleBarsTemplateEngine";

export default class TemplateEngineConfig{

    public static templateEngineList = [{
        templateType : TemplateType.HandleBars,
        templateEngine : HandleBarsTemplateEngine
    }];
}