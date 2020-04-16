const Handlebars = require("handlebars");
const http = require('http');
const fs = require('fs');
const path = require("path");
import {ClientType, SourceType, TemplateType} from '../TransformContracts';

export class CardRenderer {
    
    constructor() {
    }

    public ConstructCardJson(sourceType: SourceType, clientType: ClientType, eventJson: any): string {
        
    // TODO: Validations for inputs -
    // sourceType, clientType and eventJson to be a valid json 

    var source = fs.readFileSync(path.resolve(__dirname, "../../CardTemplates/Teams/Handlebars/issue_opened.handlebars"), "utf8");
    var template = Handlebars.compile(source); 

    // Todo take eventJson as a string input

    // TODO: Precompile templates
    //var preCompiledTemplate =  Handlebars.templates['issue_created'];
    return template(eventJson);
    }
}
