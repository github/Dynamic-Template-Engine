import { TemplateManager } from './TemplateManager';
import { CardRenderer } from './Transformer/CardRenderer/CardRenderer';
import { TemplateType, ClientType } from './Transformer/Core/TransformContracts';
import { testData } from './handlebars-test';

export async function test(){
  const path = 'TransformerConfig.json';
  await TemplateManager.setupTemplateConfiguration(path);
  //await TemplateManager.setupTemplateConfigurationFromRepo('anuraag016/TestTemplateEngine', 'master', 'TransformerConfig');
  testingTemplateRender();
  //setTimeout(testingTemplateRender, 5000);
}

const testingTemplateRender = ()=>{
  const cardRenderer = new CardRenderer();
  const renderedCard = cardRenderer.ConstructCardJson(TemplateType.HandleBars, "IssueOpened", ClientType.Teams, testData);
  console.log("START : Handlebars render card::::::::::::::::::::::::::::")
  console.log(renderedCard);
  console.log("END : Handlebars render card::::::::::::::::::::::::::::")
  const renderedCard2 = cardRenderer.ConstructCardJson(TemplateType.Liquid, "IssueOpened", ClientType.Teams, testData);
  console.log("START : Liquid render card::::::::::::::::::::::::::::")
  console.log(renderedCard2);
  console.log("END : Liquid render card::::::::::::::::::::::::::::")
};