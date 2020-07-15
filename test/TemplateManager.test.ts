import TemplateManager from '../src/TemplateManager';
import Utility from '../src/Utility/Utility';
import CardRenderer from '../src/Transformer/CardRenderer/CardRenderer';
import EventTransformer from '../src/Transformer/EventTransformer/EventTransformer';
import { FileReadError } from '../src/Error/FileError';
import { TemplateParseError } from '../src/Error/TemplateError';

jest.mock('../src/Transformer/CardRenderer/CardRenderer');
jest.mock('../src/Transformer/EventTransformer/EventTransformer');
jest.mock('../src/Utility/Utility');

const CardRendererMock: jest.Mock<CardRenderer> = <jest.Mock<CardRenderer>>(CardRenderer as any);
const EventTransformerMock: jest.Mock<EventTransformer> = <jest.Mock<EventTransformer>>(EventTransformer as any);

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

describe('TemplateManager', () => {

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

  it('original message should not be lost if setup process', async () => {
    const originalMessage = 'Original message of the error';
    jest.spyOn(TemplateManager as any, 'readConfigFile').mockImplementationOnce(() => { throw new Error(originalMessage) });
    try {
      await TemplateManager.setupTemplateConfiguration('mockTransformerConfig');
    } catch (e) {
      expect(e.message).toContain(originalMessage);
    }
  });

  it('original message should not be lost if setup process', async () => {
    const originalMessage = 'Original message of the error';
    jest.spyOn(TemplateManager as any, 'readConfigFile').mockImplementationOnce(() => { throw new Error(originalMessage) });
    try {
      await TemplateManager.setupTemplateConfigurationFromRepo('mockRepo', 'mockBranch', 'mockConfigFile');
    } catch (e) {
      expect(e.message).toContain(originalMessage);
    }
  });

});