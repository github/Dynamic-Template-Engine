import { TemplateNotFound, TemplateParseError } from '../../../src/Error/TemplateError';
import { Liquid, Template, Token } from 'liquidjs';
import LiquidTemplateEngine from '../../../src/Template/Engine/LiquidTemplateEngine';
jest.mock('liquidjs');

const mockTemplateData = [
  [
    'test',
    'testTemplate {{ template }}'
  ],
  [
    'test2',
    'testTemplate2 {{ template }}'
  ]
]

describe('LiquidTemplateEngine unit tests', () => {
  let liquidBarsTemplateEngine: LiquidTemplateEngine;
  beforeAll(() => {
    liquidBarsTemplateEngine = new LiquidTemplateEngine();
    jest.spyOn(liquidBarsTemplateEngine, 'registerTemplate');
    jest.spyOn(Liquid.prototype, 'parse').mockReturnValue([{ token: '' as any as Token, render: () => { } }]);
    jest.spyOn(Liquid.prototype, 'renderSync').mockReturnValue('test');
    for (const mockTemplate of mockTemplateData) {
      liquidBarsTemplateEngine.registerTemplate(mockTemplate[0], mockTemplate[1]);
    }
  });
  it('register template called twice', () => {
    expect(liquidBarsTemplateEngine.registerTemplate).toBeCalledTimes(2);
  });

  it('any error while parsing template should be thrown as TemplateParseError', () => {
    jest.spyOn(Liquid.prototype, 'parse').mockImplementationOnce(() => { throw new Error('Parsing failed') });
    expect(() => { liquidBarsTemplateEngine.registerTemplate('test', 'testTemplate') }).toThrowError(TemplateParseError);
  });

  it('apply template throws error for unregistered template', () => {
    expect(() => { liquidBarsTemplateEngine.applyTemplate('wrongId', { test: 'failed' } as unknown as JSON) }).toThrowError(TemplateNotFound);
  });

  it.each(mockTemplateData)('return rendered template on apply template called with correct params', (templateId, template) => {
    expect(liquidBarsTemplateEngine.applyTemplate(templateId, { template } as any as JSON)).toBeTruthy();
    expect(liquidBarsTemplateEngine.applyTemplate(templateId, { template } as any as JSON)).toBe('test');
  });
});