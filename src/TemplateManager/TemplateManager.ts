import * as fs from 'fs';
import * as https from 'https';
import TransformerConfig from "../TransformerConfig/TransformerConfig";
import { CardRenderer } from "../Transformer/CardRenderer/CardRenderer";
import TemplateEngineFactory from "../Templating/TemplateEngineFactory";
import CardRendererConfigEntry from "../Transformer/CardRenderer/CardRendererConfigEntry";
import EventTransformConfigEntry from "../Transformer/EventTransformer/EventTransformConfigEntry";
import PartialTemplateConfigEntry from "../Transformer/PartialTemplateConfigEntry";
import TemplateRegistrationHelper from './TemplateRegisterartionHelper';
import Utils from '../Utils/Utils';

// Template Manager provides methods to setup the template configuration
// intializes template engines, registers all the templates provided by the config
export default class TemplateManager{
  // Sets up the templates, picking from the path provided,
  // registering them to appropriate engines
  // Also initializes the template engines
  public static setupTemplateConfiguration(configFilePath: string){
    TemplateEngineFactory.initialize();
    try {
      const transformerConfig = this.readConfigFile(configFilePath);
      this.registerTemplates("", transformerConfig);
    } catch (error) {
      console.log(error);
    }
    console.log("Setup complete");
  }

  // Read config file and deserialize the file appropriately
  private static readConfigFile(filePath: string): TransformerConfig{
    const data = fs.readFileSync(filePath);
    return <TransformerConfig> JSON.parse(data.toString());
  }

  // Sets up the templates, picking from the repo provided,
  // registering them to appropriate engines
  // Also initializes the template engines
  public static async setupTemplateConfigurationFromRepo(repo: string, branch: string, configName: string){
    TemplateEngineFactory.initialize();
    const baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}`;
    try {
      const transformerConfig = await this.readConfigFileFromRepo(`${baseUrl}/${configName}.json`);
      this.registerTemplates(baseUrl, transformerConfig);
    } catch(error) {
      console.log(error);
    }
    
  }

    // Read config file from repo and deserialize the file appropriately
  private static async readConfigFileFromRepo(filePath: string): Promise<TransformerConfig>{
    const data = await Utils.httpSync(filePath);
    console.log(`data from repo : ${data}`);
    return <TransformerConfig> JSON.parse(data);
  }

  // Register all templates provided in the transformerConfig  
  private static registerTemplates(baseUrl:string, transformerConfig: TransformerConfig) {
    const isHttpCall = baseUrl.length > 0;
    const basepath = isHttpCall ? `${baseUrl}/CardTemplates` : 'CardTemplates';
    if(transformerConfig){
      this.registerCardRenderers(basepath, transformerConfig.cardRenderers, isHttpCall);
      this.registerEventTransformers(basepath, transformerConfig.eventTransformers, isHttpCall);
      this.registerPartials(basepath, transformerConfig.partials, isHttpCall);
    }
  }

  // TODO :: Implement Partials support 
  private static registerPartials(basepath: string, partials: PartialTemplateConfigEntry[], isHttpCall: boolean) {
    if(partials){
      partials.forEach(()=>{
        // TODO :: code for registering partials with template engine
      });
    }
  }

  // TODO :: Implement Event Transformers 
  private static registerEventTransformers(basepath: string, eventTransformers: EventTransformConfigEntry[], isHttpCall: boolean) {
    if(eventTransformers){
      eventTransformers.forEach(()=>{
        // TODO :: code for registering event transformers 
      });
    }
  }

  // Registers card renders picking the templates from the basePath and and card renderers from the Configs passed
  private static registerCardRenderers(basepath: string, cardRenderers: CardRendererConfigEntry[], isHttpCall: boolean){
    if(cardRenderers){
      cardRenderers.forEach(async element => {
        try {
          const path = `${basepath}/${element.ClientType}/${element.TemplateType}/${element.TemplateName}`;
          const templateFile = isHttpCall? await Utils.httpSync(path) : fs.readFileSync(path).toString();
          TemplateRegistrationHelper.registerCardRenderer(element.TemplateType, element.SourceType,element.ClientType, templateFile);
        } catch (error) {
          console.log(error); 
        }
      });
    }
  }
}