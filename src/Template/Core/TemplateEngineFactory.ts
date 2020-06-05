/** Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details) */
import HandleBarsTemplateEngine from '../Engine/HandleBarsTemplateEngine';
import ITemplateEngine from './ITemplateEngine';
import { TemplateType } from '../../Transformer/Core/TransformContract';
import LiquidTemplateEngine from '../Engine/LiquidTemplateEngine';
import { TemplateEngineNotFound } from '../../Error/TemplateErrors';

/**
 * A singleton class
 * TemplateEngineFactory provides a method to get right engine based on template type
 */
export default class TemplateEngineFactory {
  private templateEngineMap: Map<TemplateType,
  ITemplateEngine> = new Map<TemplateType, ITemplateEngine>();
  private static instance: TemplateEngineFactory = new TemplateEngineFactory();

  /**
   * Private constructor sets up the templateEngineMap
   */
  private constructor() {
    this.templateEngineMap.set(TemplateType.HandleBars, new HandleBarsTemplateEngine());
    this.templateEngineMap.set(TemplateType.Liquid, new LiquidTemplateEngine());
  }

  /**
   * get instance of the singleton class
   *
   * @returns {TemplateEngineFactory} Instance of TemplateEngineFactory
   */
  public static getInstance(): TemplateEngineFactory {
    return this.instance;
  }

  /**
   * Gets template engine of the provided type
   *
   * @param {TemplateType} templateType - Type of the template engine, ex. Handlebars, Liquid
   * @returns {ITemplateEngine} template engine instance registered with the factory
   */
  public getTemplateEngine(templateType: TemplateType): ITemplateEngine {
    const templateEngine = this.templateEngineMap.get(templateType);
    if (!templateEngine) {
      throw new TemplateEngineNotFound(`No template engine present for the TemplateType: ${templateType}`);
    }
    return templateEngine;
  }
}
