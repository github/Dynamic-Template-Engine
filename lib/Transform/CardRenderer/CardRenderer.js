"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("handlebars");
var http = require('http');
var fs = require('fs');
var path = require("path");
var CardRenderer = /** @class */ (function () {
    function CardRenderer() {
    }
    CardRenderer.prototype.ConstructCardJson = function (sourceType, clientType, eventJson) {
        var source = fs.readFileSync(path.resolve(__dirname, "../../CardTemplates/Teams/Handlebars/issue_opened.handlebars"), "utf8");
        var template = Handlebars.compile(source);
        // Todo take eventJson as a string input
        // TODO: Precompile templates
        //var preCompiledTemplate =  Handlebars.templates['issue_created'];
        return template(eventJson);
    };
    return CardRenderer;
}());
exports.CardRenderer = CardRenderer;
