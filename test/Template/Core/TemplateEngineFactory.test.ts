import TemplateEngineFactory from '../../../src/Template/Core/TemplateEngineFactory';
import { TemplateType } from '../../../src/Transformer/Core/TransformContract';
import HandleBarsTemplateEngine from '../../../src/Template/Engine/HandleBarsTemplateEngine';
import LiquidTemplateEngine from '../../../src/Template/Engine/LiquidTemplateEngine';
import { TemplateEngineNotFound } from '../../../src/Error/TemplateError';

describe('TemplateEngineFactory unit tests', () => {
  it('instance to be created and available without invoking new', () => {
    expect(TemplateEngineFactory.getInstance()).toBeInstanceOf(TemplateEngineFactory);
  });

  // to know more about usage of each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
  it.each`
    templateType | expected
    ${TemplateType.HandleBars} | ${HandleBarsTemplateEngine}
    ${TemplateType.Liquid} | ${LiquidTemplateEngine}
  `('returns $expected when template type: $templateType', ({ templateType, expected }) => {
    const templateEngineFactory = TemplateEngineFactory.getInstance();
    expect(templateEngineFactory.getTemplateEngine(templateType)).toBeInstanceOf(expected);
  });

  // to know more about usage of each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
  it.each`
    value | expectedError
    ${'RandomTemplateEngine'} | ${TemplateEngineNotFound}
  `('throw $expectedError error for unsupported template engine: $value', ({value, expectedError}) => {
    const templateEngineFactory = TemplateEngineFactory.getInstance();
    expect(() => {templateEngineFactory.getTemplateEngine(value)}).toThrowError(expectedError);
  });


});