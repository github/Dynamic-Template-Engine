import HandleBarsTemplateEngine from '../Engine/HandleBarsTemplateEngine';
import ITemplateEngine from './ITemplateEngine';
import { TemplateType } from '../../Transformer/Core/TransformContracts';
import LiquidTemplateEngine from '../Engine/LiquidTemplateEngine';

export default class TemplateEngineFactory {
  private templateEngineMap: Map<TemplateType, ITemplateEngine> = new Map<TemplateType, ITemplateEngine>();
  private static instance: TemplateEngineFactory = new TemplateEngineFactory();

  private constructor() {
    this.templateEngineMap.set(TemplateType.HandleBars, new HandleBarsTemplateEngine());
    this.templateEngineMap.set(TemplateType.Liquid, new LiquidTemplateEngine());
  }

  /**
   * get instance of the singleton class 
   * @returns Instance of TemplateEngineFactory
   */
  public static getInstance(): TemplateEngineFactory {
    return this.instance;
  }

  /**
   * Gets template engine of the provided type
   * @param templateType - Type of the template engine, ex. Handlebars, Liquid
   * @returns template engine instance registered with the factory
   */
  public getTemplateEngine(templateType: TemplateType): ITemplateEngine {
    const templateEngine = this.templateEngineMap.get(templateType);
    if (!templateEngine) {
      throw new Error(`No template engine present for the TemplateType: ${templateType}`);
    }
    return templateEngine;
  }
}