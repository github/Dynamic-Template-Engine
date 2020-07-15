import HandleBarsTemplateEngine from '../../../src/Template/Engine/HandleBarsTemplateEngine';
import { TemplateNotFound } from '../../../src/Error/TemplateError';
import * as Handlebars from 'handlebars';
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
    expect(()=>{handleBarsTemplateEngine.applyTemplate('wrongId', { test: 'failed' } as unknown as JSON)}).toThrowError(TemplateNotFound);
  });

  it.each(mockTemplateData)('return rendered template on apply template called with correct params', (templateId, template) => {
    expect(handleBarsTemplateEngine.applyTemplate(templateId, {template} as any as JSON)).toBeTruthy();
  });
});