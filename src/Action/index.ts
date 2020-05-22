
import * as core from '@actions/core';
import * as github from '@actions/github';
import CardRenderer from '../Transformer/CardRenderer/CardRenderer';
import TemplateManager from '../TemplateManager';
import { ClientType, TemplateType } from '../Transformer/Core/TransformContract';
import { resolve } from 'dns';

const TemplateTypeMap = new Map<string, TemplateType>(Object.entries(TemplateType).map(
  ([key, value]:[string, TemplateType]) => [key, value],
));

const ClientTypeMap = new Map<string, ClientType>(Object.entries(ClientType).map(
  ([key, value]:[string, ClientType]) => [key, value],
));

function throwIfUndefined<T>(value: T|undefined): T {
  if (value) {
    return value;
  }
  throw new Error('Undefined value found');
}

async function run(): Promise<void> {
  try {
    var options: core.InputOptions = {required:true};
    const repoName: string = core.getInput('repoName', options);
    const branch: string = core.getInput('branchName', options);
    const configName: string = core.getInput('templateConfigName', options);
    const templateTypeString = core.getInput('templateType', options);
    const sourceType: string = core.getInput('sourceType', options);
    const clientTypeString: string = core.getInput('clientType', options);
    const data: string = JSON.stringify(github.context.payload, undefined, 2);
    const dataJson: JSON = JSON.parse(data);
    const templateType: TemplateType = throwIfUndefined<TemplateType>(
      TemplateTypeMap.get(templateTypeString),
    );
    const clientType: ClientType = throwIfUndefined<ClientType>(
      ClientTypeMap.get(clientTypeString),
    );
    await TemplateManager.setupTemplateConfigurationFromRepo(repoName, branch, configName);
    const cardRenderer = new CardRenderer();
    const renderedTemplate = await cardRenderer.ConstructCardJson(templateType,
      sourceType, clientType, dataJson);
    console.log(renderedTemplate);
    core.setOutput('renderedTemplate', renderedTemplate);
  } catch (error) {
    core.setFailed(error);
  }
}


run();
