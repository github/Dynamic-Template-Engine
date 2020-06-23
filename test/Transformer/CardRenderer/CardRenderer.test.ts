import CardRenderer from "../../../src/Transformer/CardRenderer/CardRenderer";
import { TemplateType, ClientType } from "../../../src/Transformer/Core/TransformContract";
import { TemplateNotFound, TemplateParseError } from "../../../src/Error/TemplateError";
import CardRendererConfigEntry from "../../../src/Transformer/Model/CardRendererConfigEntry";
import Utility from "../../../src/Utility/Utility";
jest.mock('../../../src/Utility/Utility');

describe('Test Card Renderer Class', () => {
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
  it('Construct card json should call base class method applyTemplate', () => {
    expect(() => { cardRenderer.ConstructCardJson(cardConfigEntry.TemplateType, cardConfigEntry.SourceType, cardConfigEntry.ClientType, {}) }).toThrowError(TemplateNotFound);
    expect((cardRenderer as any).applyTemplate).toHaveBeenCalledTimes(1);
  });

  it('registerTemplate should call base class method readAndRegisterTemplate', async () => {
    await expect(async () => await cardRenderer.registerTemplate('nonExistentPath', cardConfigEntry)).rejects.toThrowError(TemplateParseError);
    expect((cardRenderer as any).readAndRegisterTemplate).toHaveBeenCalledTimes(1);
  });

  it('should fail for an unknown templateType', () => {
    
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