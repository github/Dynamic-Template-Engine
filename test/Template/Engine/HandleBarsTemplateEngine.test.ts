import HandleBarsTemplateEngine from '../../../src/Template/Engine/HandleBarsTemplateEngine';
import { TemplateNotFound } from '../../../src/Error/TemplateError';
import * as Handlebars from 'handlebars';
import { FunctionalityNotSupportedError, CustomHelperRegisterError } from '../../../src/Error/FunctionalityError';
jest.mock('handlebars');

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

describe('HandleBarsTemplateEngine unit tests', () => {
  let handleBarsTemplateEngine: HandleBarsTemplateEngine;
  beforeAll(()=>{
    handleBarsTemplateEngine = new HandleBarsTemplateEngine();
    jest.spyOn(handleBarsTemplateEngine, 'registerTemplate');
    jest.spyOn(Handlebars, 'compile').mockReturnValue((context)=> {return 'test return'});
    for(const mockTemplate of mockTemplateData){
      handleBarsTemplateEngine.registerTemplate(mockTemplate[0], mockTemplate[1]);
    }
  });
  it('register template called twice', () => {
    expect(handleBarsTemplateEngine.registerTemplate).toBeCalledTimes(2);
  });

  it('apply template throws error for unregistered template', () => {
    expect(()=>{handleBarsTemplateEngine.applyTemplate('wrongId', { test: 'failed' } as any as JSON)}).toThrowError(TemplateNotFound);
  });

  it.each(mockTemplateData)('return rendered template on apply template called with correct params', (templateId, template) => {
    expect(handleBarsTemplateEngine.applyTemplate(templateId, {template} as any as JSON)).toBeTruthy();
  });

  it.each`
  helperName | helperFn
  ${'if_plural'} | ${testFn}
  ${'testUpperCase'} | ${(str: string, options: any) => {options(str.toUpperCase())}}'
  `('register helpers for template processing', ({helperName, helperFn}) => {
    handleBarsTemplateEngine.registerHelper(helperName, helperFn);
    expect(Handlebars.registerHelper).toHaveBeenCalled();
  });

  it.each`
  helperName | helperFn
  ${'if_plural'} | ${testFn}
  ${'testUpperCase'} | ${(str: string, options: any) => {options(str.toUpperCase())}}'
  `('throws error if register helper fails', ({helperName, helperFn}) => {
    jest.spyOn(Handlebars, 'registerHelper').mockImplementationOnce(()=>{throw new Error('Failed to register helper')});
    expect(() => handleBarsTemplateEngine.registerHelper(helperName, helperFn)).toThrowError(CustomHelperRegisterError);
  });

  it('register tags for template processing should fail as Handlebars does not support', () => {
    expect(handleBarsTemplateEngine.registerTag).toThrowError(FunctionalityNotSupportedError);
  });
});