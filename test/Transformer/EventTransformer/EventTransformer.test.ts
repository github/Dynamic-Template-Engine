import EventTransformer from "../../../src/Transformer/EventTransformer/EventTransformer";
import { TemplateType, ClientType } from "../../../src/Transformer/Core/TransformContract";
import { TemplateNotFound, TemplateParseError, TemplateEngineNotFound, TemplateRenderError } from "../../../src/Error/TemplateError";
import EventTransformConfigEntry from "../../../src/Transformer/Model/EventTransformConfigEntry";
import Utility from "../../../src/Utility/Utility";
jest.mock('../../../src/Utility/Utility');

describe('Event Transformer Unit tests', () => {
  let eventTransformer: EventTransformer;
  let eventConfigEntry: EventTransformConfigEntry;
  let applyTemplate: jest.SpyInstance;
  beforeAll(() => {
    eventTransformer = new EventTransformer();
    eventConfigEntry = {
      SourceType: 'test',
      TemplateType: TemplateType.HandleBars,
      TemplateName: 'testTemplate.handlebars'
    };
    applyTemplate = jest.spyOn(eventTransformer as any, 'applyTemplate');
    jest.spyOn(eventTransformer as any, 'readAndRegisterTemplate');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Construct event json should call base class method applyTemplate', () => {
    expect(() => { eventTransformer.ConstructEventJson(eventConfigEntry.TemplateType, eventConfigEntry.SourceType, {}) }).toThrowError(TemplateNotFound);
    expect((eventTransformer as any).applyTemplate).toHaveBeenCalledTimes(1);
  });

  it('registerTemplate should call base class method readAndRegisterTemplate', async () => {
    await expect(async () => await eventTransformer.registerTemplate('', eventConfigEntry)).rejects.toThrowError(TemplateParseError);
    expect((eventTransformer as any).readAndRegisterTemplate).toHaveBeenCalledTimes(1);
  });

  it('registerTemplate should call base class method readAndRegisterTemplate for repo', async () => {
    await expect(async () => await eventTransformer.registerTemplate('nonExistentPath', eventConfigEntry)).rejects.toThrowError(TemplateParseError);
    expect((eventTransformer as any).readAndRegisterTemplate).toHaveBeenCalledTimes(1);
  });

  it.each`
    config | expectedError
    ${{
      SourceType: 'test',
      TemplateType: 'NonExistentTemplateType',
      TemplateName: 'testTemplate.handlebars'
    }} | ${TemplateEngineNotFound}
    ${{
      SourceType: 'test',
      TemplateType: TemplateType.HandleBars,
      TemplateName: 'testTemplate.handlebars'
    }} | ${TemplateParseError}`
    ('registerTemplate should fail for unknown templateType and unknown template', async ({ config, expectedError }) => {
      await expect(async () => await eventTransformer.registerTemplate('nonExistentPath', config)).rejects.toThrowError(expectedError);
    });

  it.each`
    config | expectedError
    ${{
      SourceType: 'test',
      TemplateType: 'NonExistentTemplateType',
      TemplateName: 'testTemplate.handlebars'
    }} | ${TemplateEngineNotFound}
    ${{
      SourceType: 'test',
      TemplateType: TemplateType.HandleBars,
      TemplateName: 'testTemplate.handlebars'
    }} | ${TemplateRenderError}`
    ('ConstructEventJson should fail for unknown templateType and unknown template', async ({ config, expectedError }) => {
      if (expectedError === TemplateRenderError) {
        applyTemplate.mockImplementationOnce(() => { throw new Error('Random error'); });
      }
      await expect(async () => eventTransformer.ConstructEventJson(config.TemplateType, config.SourceType, {})).rejects.toThrowError(expectedError);
    });

  it('Register and construct function should call keyGenerator with same params for same template', async () => {
    try {
      eventTransformer.ConstructEventJson(eventConfigEntry.TemplateType, eventConfigEntry.SourceType, {});
    } catch (e) {
    }
    expect(Utility.keyGenerator).toHaveBeenCalledWith((EventTransformer as any).KEY_PREFIX, eventConfigEntry.TemplateType, eventConfigEntry.SourceType);
    try {
      await eventTransformer.registerTemplate('nonExistentPath', eventConfigEntry);
    } catch (e) {
    }
    expect(Utility.keyGenerator).toHaveBeenCalledWith((EventTransformer as any).KEY_PREFIX, eventConfigEntry.TemplateType, eventConfigEntry.SourceType);
  });

});