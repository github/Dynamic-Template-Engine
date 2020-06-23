import ITemplateEngine from './ITemplateEngine';
import { TemplateType } from '../../Transformer/Core/TransformContract';
/**
 * A singleton class
 * TemplateEngineFactory provides a method to get right engine based on template type
 */
export default class TemplateEngineFactory {
    private templateEngineMap;
    private static instance;
    /**
     * Private constructor sets up the templateEngineMap
     */
    private constructor();
    /**
     * get instance of the singleton class
     *
     * @returns {TemplateEngineFactory} Instance of TemplateEngineFactory
     */
    static getInstance(): TemplateEngineFactory;
    /**
     * Gets template engine of the provided type
     *
     * @param {TemplateType} templateType - Type of the template engine, ex. Handlebars, Liquid
     * @returns {ITemplateEngine} template engine instance registered with the factory
     */
    getTemplateEngine(templateType: TemplateType): ITemplateEngine;
}
