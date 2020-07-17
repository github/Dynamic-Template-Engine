import TemplateManager from '../src/TemplateManager';
import Utility from '../src/Utility/Utility';
import CardRenderer from '../src/Transformer/CardRenderer/CardRenderer';
import EventTransformer from '../src/Transformer/EventTransformer/EventTransformer';
import { FileReadError } from '../src/Error/FileError';
import { TemplateParseError } from '../src/Error/TemplateError';
import HandleBarsTemplateEngine from '../src/Template/Engine/HandleBarsTemplateEngine';
import LiquidTemplateEngine from '../src/Template/Engine/LiquidTemplateEngine';
import { TemplateType, CustomEngineOptions, CustomTemplatingOptions } from '../src';
import TemplateEngineFactory from '../src/Template/Core/TemplateEngineFactory';

jest.mock('../src/Transformer/CardRenderer/CardRenderer');
jest.mock('../src/Transformer/EventTransformer/EventTransformer');
jest.mock('../src/Utility/Utility');
jest.mock('../src/Template/Engine/HandleBarsTemplateEngine');
jest.mock('../src/Template/Engine/LiquidTemplateEngine');

const CardRendererMock: jest.Mock<CardRenderer> = <jest.Mock<CardRenderer>>(CardRenderer as any);
const EventTransformerMock: jest.Mock<EventTransformer> = <jest.Mock<EventTransformer>>(EventTransformer as any);
const HandleBarsTemplateEngineMock: jest.Mock<HandleBarsTemplateEngine> = <jest.Mock<HandleBarsTemplateEngine>>(HandleBarsTemplateEngine as any);
const LiquidTemplateEngineMock: jest.Mock<LiquidTemplateEngine> = <jest.Mock<LiquidTemplateEngine>>(LiquidTemplateEngine as any);

const mockTransformerConfig = {
  "cardRenderer": [
    {
      "SourceType": "IssueOpened",
      "ClientType": "Teams",
      "TemplateType": "HandleBars",
      "TemplateName": "issue_opened.handlebars"
    }
  ],
  "partials": [],
  "eventTransformer": [
    {
      "SourceType": "IssueOpened",
      "TemplateType": "HandleBars",
      "TemplateName": "issue_opened.handlebars"
    }
  ]
}

const handlebarsEngineOptions: CustomEngineOptions = {
  templateType: TemplateType.HandleBars,
  customHelpers: {
    'upperCaseTest': (str: string) => { return str.toUpperCase() },
    'lowerCaseTest': (str: string) => { return str.toLowerCase() }
  }
};

const liquidEngineOptions: CustomEngineOptions = {
  templateType: TemplateType.Liquid,
  customHelpers: {
    'upperCaseTest': (str: string) => { return str.toUpperCase() },
    'lowerCaseTest': (str: string) => { return str.toLowerCase() }
  },
  customTags: {
    'upperTest': {
      parse: function(this: any,tagToken: any, remainTokens: any): void {
        this.str1 = tagToken.args;
      },
      render: function(this:any, scope: any, hash: any): string {
        let str = scope.environments[this.str1];
        return str.toUpperCase(); 
      }
    }
  }
};

const onlyTagsLiquidOptions: CustomEngineOptions = {
  templateType: TemplateType.Liquid,
  customTags: liquidEngineOptions.customTags
}

const onlyHelpersLiquidOptions: CustomEngineOptions = {
  templateType: TemplateType.Liquid,
  customHelpers: liquidEngineOptions.customHelpers
}

describe('TemplateManager Unit Tests', () => {

  beforeAll(() => {
    jest.spyOn(TemplateManager as any, 'registerAllTemplates');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setupTemplateConfiguration fails for no file', () => {
    expect(TemplateManager.setupTemplateConfiguration('nonExistantFilePath')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('setupTemplateConfigurationFromRepo fails for no file', () => {
    expect(TemplateManager.setupTemplateConfigurationFromRepo('nonExistantrepo', 'nonExistantBranch', 'nonExistantFileName')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('setupTemplateConfiguration registers all templates', async () => {
    Utility.fetchFile = jest.fn().mockReturnValueOnce(JSON.stringify(mockTransformerConfig));
    await TemplateManager.setupTemplateConfiguration('mockTransformerConfig');
    expect((TemplateManager as any).registerAllTemplates).toHaveBeenCalledTimes(2);
    expect(CardRendererMock.mock.instances[0].registerTemplate).toHaveBeenCalledTimes(1);
    expect(EventTransformerMock.mock.instances[0].registerTemplate).toHaveBeenCalledTimes(1);
  });

  it('setupTemplateConfigurationFromRepo registers all templates', async () => {
    Utility.fetchFile = jest.fn().mockReturnValueOnce(JSON.stringify(mockTransformerConfig));
    await TemplateManager.setupTemplateConfigurationFromRepo('mockRepo', 'mockBranch', 'mockFile');
    expect((TemplateManager as any).registerAllTemplates).toHaveBeenCalledTimes(2);
    expect(CardRendererMock.mock.instances[0].registerTemplate).toHaveBeenCalledTimes(1);
    expect(EventTransformerMock.mock.instances[0].registerTemplate).toHaveBeenCalledTimes(1);
  });

  it.each`ErrorToThrow | ErrorExpected
  ${TemplateParseError} | ${TemplateParseError}
  ${FileReadError} | ${Error}`('setupTemplateConfigurationFromRepo fails if any register template fails', async ({ ErrorToThrow, ErrorExpected }) => {
    Utility.fetchFile = jest.fn()
      .mockImplementationOnce(async (isHttpCall, filePath) => { return JSON.stringify(mockTransformerConfig) });
    jest.spyOn(CardRenderer.prototype, 'registerTemplate').mockImplementationOnce(() => {
      throw new ErrorToThrow('Test');
    });
    try {
      await TemplateManager.setupTemplateConfigurationFromRepo('mockRepo', 'mockBranch', 'mockFile');
    } catch (e) {
      expect(e).toBeInstanceOf(ErrorExpected);
    }

  });

  it('original message should not be lost if setup process fails', async () => {
    const originalMessage = 'Original message of the error';
    jest.spyOn(TemplateManager as any, 'readConfigFile').mockImplementationOnce(() => { throw new Error(originalMessage) });
    try {
      await TemplateManager.setupTemplateConfiguration('mockTransformerConfig');
    } catch (e) {
      expect(e.message).toContain(originalMessage);
    }
  });

  it('original message should not be lost if setup process fails', async () => {
    const originalMessage = 'Original message of the error';
    jest.spyOn(TemplateManager as any, 'readConfigFile').mockImplementationOnce(() => { throw new Error(originalMessage) });
    try {
      await TemplateManager.setupTemplateConfigurationFromRepo('mockRepo', 'mockBranch', 'mockConfigFile');
    } catch (e) {
      expect(e.message).toContain(originalMessage);
    }
  });

  it.each`
  testType | options 
  ${'test register Helpers for handlebars'} | ${handlebarsEngineOptions}
  ${'test register tags and helpers for liquid'} | ${liquidEngineOptions}
  ${'test register only helpers for liquid'} | ${onlyHelpersLiquidOptions}
  ${'test register only tags for liquid'} | ${onlyTagsLiquidOptions}
  `('registerHelpersAndTags: $testType', ({testType, options}) => {
    (TemplateManager as any).registerHelpersAndTags(options);
    let engine = TemplateEngineFactory.getInstance().getTemplateEngine(options.templateType);
    if (options.customHelpers){
      let size = Object.keys(options.customHelpers).length;
      expect(engine.registerHelper).toHaveBeenCalledTimes(size);
    }
    if (options.customTags){
      let size = Object.keys(options.customTags).length;
      expect(engine.registerTag).toHaveBeenCalledTimes(size);
    }
  });

});