var Handlebars = require("handlebars");
var http = require('http');
var fs = require('fs');
const path = require("path");

export class CardRenderer {
    
    constructor() {
    }

    public ConstructCardJson(sourceType: string, clientType: string, eventJson: any): string {
        
    var source = fs.readFileSync(path.resolve(__dirname, "../../CardTemplates/Teams/Handlebars/issue_opened.handlebars"), "utf8");
    var template = Handlebars.compile(source); 

    // Todo take eventJson as a string input

    // TODO: Precompile templates
    //var preCompiledTemplate =  Handlebars.templates['issue_created'];
    return template(eventJson);
    }
}
