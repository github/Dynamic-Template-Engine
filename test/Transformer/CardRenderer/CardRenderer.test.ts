import CardRenderer from "../../../src/Transformer/CardRenderer/CardRenderer";
import { TemplateType, ClientType } from "../../../src/Transformer/Core/TransformContract";
import { TemplateNotFound, TemplateParseError, TemplateEngineNotFound, TemplateRenderError } from "../../../src/Error/TemplateError";
import CardRendererConfigEntry from "../../../src/Transformer/Model/CardRendererConfigEntry";
import Utility from "../../../src/Utility/Utility";
jest.mock('../../../src/Utility/Utility');

describe('Card Renderer Unit tests', () => {
  let cardRenderer: CardRenderer;
  let cardConfigEntry: CardRendererConfigEntry;
  beforeAll(() => {
    cardRenderer = new CardRenderer();
    cardConfigEntry = {
      SourceType: 'test',
      ClientType: ClientType.Teams,
      TemplateType: TemplateType.HandleBars,
      TemplateName: 'testTemplate.handlebars'
    };
    jest.spyOn(cardRenderer as any, 'applyTemplate');
    jest.spyOn(cardRenderer as any, 'readAndRegisterTemplate');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Construct card json should call base class method applyTemplate', () => {
    expect(() => { cardRenderer.ConstructCardJson(cardConfigEntry.TemplateType, cardConfigEntry.SourceType, cardConfigEntry.ClientType, {}) }).toThrowError(TemplateNotFound);
    expect((cardRenderer as any).applyTemplate).toHaveBeenCalledTimes(1);
  });

  it('registerTemplate should call base class method readAndRegisterTemplate', async () => {
    await expect(async () => await cardRenderer.registerTemplate('', cardConfigEntry)).rejects.toThrowError(TemplateParseError);
    expect((cardRenderer as any).readAndRegisterTemplate).toHaveBeenCalledTimes(1);
  });

  it('registerTemplate should call base class method readAndRegisterTemplate for repo', async () => {
    await expect(async () => await cardRenderer.registerTemplate('nonExistentPath', cardConfigEntry)).rejects.toThrowError(TemplateParseError);
    expect((cardRenderer as any).readAndRegisterTemplate).toHaveBeenCalledTimes(1);
  });

  // to know more about usage of each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
  it.each`
    config | expectedError
    ${{SourceType: 'test',
    ClientType: ClientType.Teams,
    TemplateType: 'NonExistentTemplateType',
    TemplateName: 'testTemplate.handlebars'}} | ${TemplateEngineNotFound}
    ${{SourceType: 'test',
    ClientType: ClientType.Teams,
    TemplateType: TemplateType.HandleBars,
    TemplateName: 'testTemplate.handlebars'}} | ${TemplateParseError}`
    ('registerTemplate should fail for unknown templateType and unknown template', async ({config, expectedError})=>{
      await expect(async () => await cardRenderer.registerTemplate('nonExistentPath', config)).rejects.toThrowError(expectedError);
  });

  // to know more about usage of each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
  it.each`
    config | expectedError
    ${{SourceType: 'test',
    ClientType: ClientType.Teams,
    TemplateType: 'NonExistentTemplateType',
    TemplateName: 'testTemplate.handlebars'}} | ${TemplateEngineNotFound}
    ${{SourceType: 'test',
    ClientType: ClientType.Teams,
    TemplateType: TemplateType.HandleBars,
    TemplateName: 'testTemplate.handlebars'}} | ${TemplateRenderError}`
    ('ConstructCardJson should fail for unknown templateType and unknown template', async ({config, expectedError})=>{
      if (expectedError === TemplateRenderError) {
        jest.spyOn(cardRenderer as any, 'applyTemplate').mockImplementationOnce( () => { throw new Error('Random error');} );
      }
      await expect(async () => await cardRenderer.ConstructCardJson(config.TemplateType, config.SourceType, config.ClientType, {})).rejects.toThrowError(expectedError);
  });

  it('Register and construct function should call keyGenerator with same params for same template', async () => {
    try {
      cardRenderer.ConstructCardJson(cardConfigEntry.TemplateType, cardConfigEntry.SourceType, cardConfigEntry.ClientType, {});
    } catch (e) {
    }
    expect(Utility.keyGenerator).toHaveBeenCalledWith((CardRenderer as any).KEY_PREFIX, cardConfigEntry.TemplateType, cardConfigEntry.SourceType, cardConfigEntry.ClientType);
    try{
      await cardRenderer.registerTemplate('nonExistentPath', cardConfigEntry);
    }catch(e){
    }
    expect(Utility.keyGenerator).toHaveBeenCalledWith((CardRenderer as any).KEY_PREFIX, cardConfigEntry.TemplateType, cardConfigEntry.SourceType, cardConfigEntry.ClientType);
  });

});