# event-transformer
A typescript library to transform event payloads (in json format) to standard jsons or chat client platform specific jsons (e.g. Slack and Teams) using templates (e.g. handlebars, liquid)

## About
This node module enables you to convert any data payload into any other form using templates. This module currently supports two templating languages: Handlebars and liquid. 
The module gives the capability of loading templates either from a public repo in Github or use the inbuilt ones. 

## Table of contents 
- [Usage](#usage)
- [Setup](#setup)
- [Using the templating functionality](#using-the-templating-functionality)

## Usage
Three main classes that are exported out of the module are TemplateManager, CardRenderer and EventTransformer, to import the same use: 

```bash
import { CardRenderer, TemplateManager, EventTransformer } from 'event-transformer';
```

## Setup 

Before you can use the functionality of combining templates with a data model to produce result documents. You need to first setup the all the templates using the TemplateManage. 
To setup the templates use the following code:

```bash
// for picking templates from a repo
TemplateManager.setupTemplateConfigurationFromRepo(repoName, branch, configName);

// for picking up inbuilt templates 
TemplateManager.setupTemplateConfiguration(filePath); // file path of the config
```

Note: If you choose to use your own repo for picking template use the following template repo. The structure of the repo should be same as this repo.

## Using the templating functionality

To use the templates to combine with the data model use following code: 

```bash
// To use the card renderer templates from the TransformerConfig.json
// TemplateType is an enum exported by the module currently only Handlebars and Liquid are supported
// ClientType is an enum exported by the module currently only Teams is supported
// SourceType can be any string, but has to be registered in the TransformerConfig.json
// DataJson needs to be a json that the intended template can understand
const cardRenderer = new CardRenderer();
const renderedTemplate = await cardRenderer.ConstructCardJson(templateType, sourceType, clientType, dataJson);

// To use the event transformer templates from the TransformerConfig.json
// TemplateType is an enum exported by the module currently only Handlebars and Liquid are supported
// SourceType can be any string, but has to be registered in the TransformerConfig.json
// evetJson needs to be a json that the intended template can understand
const eventTransformer = new EventTransformer();
const renderedTemplate = await evenTransformer.ConstructEventJson(templateType,sourceType, eventJson);
```

