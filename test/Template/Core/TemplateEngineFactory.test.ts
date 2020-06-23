import TemplateEngineFactory from '../../../src/Template/Core/TemplateEngineFactory';
import { TemplateType } from '../../../src/Transformer/Core/TransformContract';
import HandleBarsTemplateEngine from '../../../src/Template/Engine/HandleBarsTemplateEngine';
import LiquidTemplateEngine from '../../../src/Template/Engine/LiquidTemplateEngine';
import AdaptiveCardTemplateEngine from '../../../src/Template/Engine/AdaptiveCardTemplateEngine';
import { TemplateEngineNotFound } from '../../../src/Error/TemplateError';

describe('TemplateEngineFactory tests', () => {
  it('instance to be created and available without invoking new', () => {
    expect(TemplateEngineFactory.getInstance()).toBeInstanceOf(TemplateEngineFactory);
  });

  it.each`
    templateType | expected
    ${TemplateType.HandleBars} | ${HandleBarsTemplateEngine}
    ${TemplateType.Liquid} | ${LiquidTemplateEngine}
  `('returns $expected when template type: $templateType', ({ templateType, expected }) => {
    const templateEngineFactory = TemplateEngineFactory.getInstance();
    expect(templateEngineFactory.getTemplateEngine(templateType)).toBeInstanceOf(expected);
  });

  it.each`
    value | expectedError
    ${'RandomTemplateEngine'} | ${TemplateEngineNotFound}
  `('throw $expectedError error for unsupported template engine: $value', ({value, expectedError}) => {
    const templateEngineFactory = TemplateEngineFactory.getInstance();
    expect(() => {templateEngineFactory.getTemplateEngine(value)}).toThrowError(expectedError);
  });


});