import { TemplateNotFound, TemplateParseError } from '../../../src/Error/TemplateError';
import { Liquid, Token } from 'liquidjs';
import LiquidTemplateEngine from '../../../src/Template/Engine/LiquidTemplateEngine';
import { CustomHelperRegisterError, CustomTagRegisterError } from '../../../src/Error/FunctionalityError';
jest.mock('liquidjs');
const LiquidMock: jest.Mock<Liquid> = <jest.Mock<Liquid>>(Liquid as any);

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

function testFn (this: any, number: number, options: any): void { 
  ((number > 1) ? options.fn(this) : options.inverse(this));
}

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

  it.each`
  helperName | helperFn
  ${'if_plural'} | ${testFn}
  ${'testUpperCase'} | ${(str: string, options: any) => {options(str.toUpperCase())}}'
  `('register helpers for template processing', ({helperName, helperFn}) => {
    liquidBarsTemplateEngine.registerHelper(helperName, helperFn);
    expect(LiquidMock.mock.instances[0].registerFilter).toHaveBeenCalled();
  });

  it.each`
  helperName | helperFn
  ${'if_plural'} | ${testFn}
  ${'testUpperCase'} | ${(str: string, options: any) => {options(str.toUpperCase())}}'
  `('register helpers for template processing should throw error if registerFilter fails',
    ({helperName, helperFn}) => {
      jest.spyOn(Liquid.prototype, 'registerFilter').mockImplementationOnce(() => {
        throw new Error('Failed to register filter')
      });
      expect(() => liquidBarsTemplateEngine.registerHelper(helperName, helperFn)).toThrowError(CustomHelperRegisterError);
    }
  );

  it.each`
  tagName | tagOptions
  ${'if_plural'} | ${{parse: testFn}}
  ${'testUpperCase'} | ${{parse: (str: string, options: any) => {options(str.toUpperCase())}}}'
  `('register tags for template processing', ({tagName, tagOptions}) => {
    liquidBarsTemplateEngine.registerTag(tagName, tagOptions);
    expect(LiquidMock.mock.instances[0].registerTag).toHaveBeenCalled();
  });

  it.each`
  tagName | tagOptions
  ${'if_plural'} | ${{parse: testFn}}
  ${'testUpperCase'} | ${{parse: (str: string, options: any) => {options(str.toUpperCase())}}}'
  `('register tags for template processing throw error if register tag fails', ({tagName, tagOptions}) => {
    jest.spyOn(Liquid.prototype, 'registerTag').mockImplementationOnce(() => {
      throw new Error('Failed to register tag')
    });
    expect(() => liquidBarsTemplateEngine.registerTag(tagName, tagOptions)).toThrowError(CustomTagRegisterError);
  });
});