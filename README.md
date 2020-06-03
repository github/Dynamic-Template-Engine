# event-transformer
A typescript library to transform event payloads (in json format) to standard jsons or chat client platform specific jsons (e.g. Slack and Teams) using templates (e.g. handlebars, liquid)

> :warning: **NOTE**: this module is currently in active development and no stable build has been released as of now, any api may be changed without notice.

## About
This node module enables you to convert any data payload into any other form using templates. This module currently supports two templating languages: Handlebars and liquid. 
The module gives the capability of loading templates either from a public repo in Github or use the inbuilt ones. 

## Table of contents 
- [Introduction](#introduction)
- [Understanding the TransformerConfig](#understanding-the-transformerConfig)
- [Template Directory Structure](#template-directory-structure)
- [Usage](#usage)
- [Setup](#setup)
- [Using the templating functionality](#using-the-templating-functionality)
- [Features](#features)
- [Questions? Need help?](#questions-need-help)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Introduction
The event-transformer module uses a [TransformerConfig](#understanding-the-transformerConfig) to load up the templates and precomiple them with the correct language on the [setup call](#setup). After the setup the templating functionality can be used by [calling the correct transformer class](#using-the-templating-functionality). 
The templates should be in the same directory structure as mentioned [here](#template-directory-structure)

## Understanding the TransformerConfig
The TransformerConfig.json is the file that allows you to load different templates for different tasks. Following is an example TransformConfig.json

```js
{
  "cardRenderer":[
    {
      "SourceType": "IssueOpened", // Source type can be any string 
      "ClientType": "Teams", // Has to be an ClientType value currently only Teams is supported
      "TemplateType": "HandleBars", // Has to be TemplateType enum value, currently HandleBars and Liquid are the two supported 
      "TemplateName": "issue_opened.handlebars" // name of the template file 
    },
    {
      "SourceType": "IssueReopened",
      "ClientType": "Teams",
      "TemplateType": "HandleBars",
      "TemplateName": "issue_reopened.handlebars"
    }
  ],
  "partials":[],
  "eventTransformer":[
    {
      "SourceType":"IssueOpened",// Source type can be any string
      "TemplateType":"HandleBars",// Has to be TemplateType enum value, currently HandleBars and Liquid are the two supported 
      "TemplateName":"issue_opened.handlebars" // name of the template file 
    }
  ]
}
```

## Template Directory Structure
The templates should reside in a following directory structure for the module to be able to pick them properly
```bash
// Card templates 
CardTemplate ---> Teams  ---> HandleBars ---> {template file(s)}
                         ---> Liquid ---> {template file(s)}
// Event Transformer templates
EventTransformer ---> HandleBars ---> {template file(s)}
                 ---> Liquid ---> {template file(s)}
```

## Usage
Three main classes that are exported out of the module are TemplateManager, CardRenderer and EventTransformer, to import the same use: 

```ts
import { CardRenderer, TemplateManager, EventTransformer } from 'event-transformer';
```

## Setup 

Before you can use the functionality of combining templates with a data model to produce result documents. You need to first setup the all the templates using the TemplateManage. 
To setup the templates use the following code:

```ts
// To pick templates from a repo
TemplateManager.setupTemplateConfigurationFromRepo(repoName, branch, configName);

// To pick up inbuilt templates 
TemplateManager.setupTemplateConfiguration(filePath); // file path of the config
```

Note: If you choose to use your own repo for picking template use the following template repo. The structure of the repo should be same as this repo.

## Using the templating functionality

To use the templates to combine with the data model use following code: 

```ts
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
## Features
Current features supported are: 
- Picking templates from a separate public repo.
- Picking up two different types of templates: namely Liquid and Handlebars.
- Two seperate groups of templates: card renderers and event transformers.

Features not supported yet, but planned:
- Partial template support.
## Questions? Need help?
Please fill out GitHub's [Support form](https://support.github.com/contact?subject=Re:+GitHub%2BSlack+Integration) and your request will be routed to the right team at GitHub.

## Contributing
Want to help improve the integration between GitHub and Slack? Check out the [contributing docs](CONTRIBUTING.md) to get involved.

## Code of Conduct

See [our code of conduct](CODE_OF_CONDUCT.md).

## License
The project is available as open source under the terms of the [MIT License](LICENSE).

When using the GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).
