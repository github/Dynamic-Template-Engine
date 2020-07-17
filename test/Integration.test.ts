import { TemplateManager, CardRenderer, EventTransformer, TemplateType, ClientType } from "../src/index";
import * as nock from "nock";
import * as MockTransformerConfig from './MockTemplate/MockTransformerConfig.json';
import Utility from "../src/Utility/Utility";
import * as path from 'path';
import CustomEngineOptions from "../src/Transformer/Model/CustomEngineOptions";
import CustomTemplatingOptions from "../src/Transformer/Model/CustomTemplatingOptions";


const mockData = {
  post: {
    name: "Test Post",
    description: "This is mock data of a post",
    link: "http://ItsMockData.com",
    createDate: "1594060200000"
  },
  owner: {
    name: "Tester",
    handle: "tester005",
  }
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

const templatingOptions: CustomTemplatingOptions = {
  engineOptions: [handlebarsEngineOptions, liquidEngineOptions]
};

describe('End to end test with mock data and mock templates from local filesystem', () => {

  beforeAll(async () => {
    await TemplateManager.setupTemplateConfiguration(
      path.resolve(__dirname, 'MockTemplate/MockTransformerConfig.json'),
      templatingOptions);
  });

  it.each`
  templateType | clientType | sourceType
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"MockData"}
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"TestHelperFunction"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"MockData"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"TestHelperFunction"}
  `('Test CardRenderer for $templateType, $clientType and $sourceType', ({ templateType, clientType, sourceType }) => {
    const cardRenderer = new CardRenderer();
    expect(cardRenderer.ConstructCardJson(templateType, sourceType, clientType, { 'name': 'Test' })).toMatchSnapshot();
  });

  it.each`
  templateType | sourceType
  ${TemplateType.HandleBars} | ${"MockData2"}
  ${TemplateType.Liquid} | ${"MockData2"}
  `('Test EventTransformer for $templateType', ({ templateType, sourceType }) => {
    const eventTransformer = new EventTransformer();
    expect(eventTransformer.ConstructEventJson(templateType, sourceType, { 'name': 'Test' })).toMatchSnapshot();
  });

  it.each`
  templateType | clientType | sourceType
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"MockPostData"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"MockPostData"}
  `('Test CardRenderer for $templateType and $clientType', ({ templateType, clientType, sourceType }) => {
    const cardRenderer = new CardRenderer();
    expect(cardRenderer.ConstructCardJson(templateType, sourceType, clientType, mockData)).toMatchSnapshot();
  });
});

describe('End to end test with mock data and mock templates from github repos', () => {
  const mockRepoName = 'test/mockTemplates';
  const mockBranchName = 'master';
  const mockTransformerConfigName = 'MockTransformerConfig';

  const setupMockApiCalls = () => {
    MockTransformerConfig.cardRenderer.forEach(element => {
      nock("https://raw.githubusercontent.com")
        .get(`/${mockRepoName}/${mockBranchName}/CardTemplate/${element.ClientType}/${element.TemplateType}/${element.TemplateName}`)
        .reply(200,
          async () => {
            return await Utility.fetchFile(false, path.resolve(__dirname, `MockTemplate/CardTemplate/${element.ClientType}/${element.TemplateType}/${element.TemplateName}`));
          }
        );
    });
    MockTransformerConfig.eventTransformer.forEach(element => {
      nock("https://raw.githubusercontent.com")
        .get(`/${mockRepoName}/${mockBranchName}/EventTemplate/${element.TemplateType}/${element.TemplateName}`)
        .reply(200, 
          async () => { 
            return await Utility.fetchFile(false, path.resolve(__dirname, `MockTemplate/EventTemplate/${element.TemplateType}/${element.TemplateName}`));
          }
        );
    });
  };

  beforeAll(async () => {
    nock("https://raw.githubusercontent.com")
      .get(`/${mockRepoName}/${mockBranchName}/${mockTransformerConfigName}.json`)
      .reply(200, JSON.stringify(MockTransformerConfig));

    setupMockApiCalls();
    await TemplateManager.setupTemplateConfigurationFromRepo(mockRepoName, mockBranchName,
      mockTransformerConfigName, templatingOptions);
  });

  it.each`
  templateType | clientType | sourceType
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"MockData"}
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"TestHelperFunction"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"MockData"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"TestHelperFunction"}
  `('Test CardRenderer for $templateType, $clientType and $sourceType', ({ templateType, clientType, sourceType }) => {
    const cardRenderer = new CardRenderer();
    expect(cardRenderer.ConstructCardJson(templateType, sourceType, clientType, { 'name': 'Test' })).toMatchSnapshot();
  });

  it.each`
  templateType | sourceType
  ${TemplateType.HandleBars} | ${"MockData2"}
  ${TemplateType.Liquid} | ${"MockData2"}
  `('Test EventTransformer for $templateType', ({ templateType, sourceType }) => {
    const eventTransformer = new EventTransformer();
    expect(eventTransformer.ConstructEventJson(templateType, sourceType, { 'name': 'Test' })).toMatchSnapshot();
  });

  it.each`
  templateType | clientType | sourceType
  ${TemplateType.HandleBars} | ${ClientType.Teams} | ${"MockPostData"}
  ${TemplateType.Liquid} | ${ClientType.Teams} | ${"MockPostData"}
  `('Test CardRenderer for $templateType and $clientType', ({ templateType, clientType, sourceType }) => {
    const cardRenderer = new CardRenderer();
    expect(cardRenderer.ConstructCardJson(templateType, sourceType, clientType, mockData)).toMatchSnapshot();
  });
});