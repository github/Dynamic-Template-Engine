/* eslint-disable import/extensions */
/* eslint-disable no-console */
import TemplateManager from '../src/TemplateManager';
import CardRenderer from '../src/Transformer/CardRenderer/CardRenderer';
import { TemplateType, ClientType } from '../src/Transformer/Core/TransformContract';
import { testData } from './handlebars-test';

const testingTemplateRender = () => {
  const cardRenderer = new CardRenderer();
  const renderedCard = cardRenderer.ConstructCardJson(TemplateType.HandleBars, 'IssueOpened', ClientType.Teams, testData);
  console.log('START : Handlebars render card::::::::::::::::::::::::::::');
  console.log(renderedCard);
  console.log('END : Handlebars render card::::::::::::::::::::::::::::');
  const renderedCard2 = cardRenderer.ConstructCardJson(TemplateType.Liquid, 'IssueOpened', ClientType.Teams, testData);
  console.log('START : Liquid render card::::::::::::::::::::::::::::');
  console.log(renderedCard2);
  console.log('END : Liquid render card::::::::::::::::::::::::::::');
};

export default async function test() {
  const path = 'TransformerConfig.json';
  //await TemplateManager.setupTemplateConfiguration(path);
  await TemplateManager.setupTemplateConfigurationFromRepo
  ('meghnasavit/hello-world-javascript-action', 'master', 'TransformerConfig', 'IssueOpened', 'HandleBars');
  await TemplateManager.setupTemplateConfigurationFromRepo
  ('meghnasavit/hello-world-javascript-action', 'master', 'TransformerConfig', 'IssueOpened', 'Liquid');
  testingTemplateRender();
  // setTimeout(testingTemplateRender, 5000);
}
