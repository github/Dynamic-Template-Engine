import Transformer from './Transformer/Core/Transformer';
import TransformerConfig from "./Transformer/Model/TransformerConfig";
import Utils from './Utility/Utility';
import BaseTransformConfigEntry from './Transformer/Model/BaseTransformConfigEntry';
import { CardRenderer } from './Transformer/CardRenderer/CardRenderer';
import EventTransformer from './Transformer/EventTransformer/EventTransformer';

/**
 * Template Manager provides methods to setup the template configuration
 * intializes template engines, registers all the templates provided by the config
 */
export class TemplateManager{
  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   * @param configFilePath 
   */
  public static async setupTemplateConfiguration(configFilePath: string): Promise<void>{
    try {
      const transformerConfig = await this.readConfigFile(configFilePath, false);
      await this.registerAllTemplates('', new CardRenderer(), transformerConfig.cardRenderer);
      await this.registerAllTemplates('', new EventTransformer(), transformerConfig.eventTransformer);
    } catch (error) {
      console.log(error, configFilePath);
    }
    console.log("Setup complete");
  }

  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   * @param repo - repo name ex. user/repo
   * @param branch - ex. master
   * @param configName config file name in the repo root folder
   */
  public static async setupTemplateConfigurationFromRepo(repo: string, branch: string, configName: string): Promise<void>{
    const baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}`;
    try {
      const transformerConfig = await this.readConfigFile(`${baseUrl}/${configName}.json`, true);
      await this.registerAllTemplates(baseUrl, new CardRenderer(), transformerConfig.cardRenderer);
      await this.registerAllTemplates(baseUrl, new EventTransformer(), transformerConfig.eventTransformer);
    } catch(error) {
      console.log(error);
    }
    
  }

  /**
   * Read config file and deserialize the file appropriately
   * @param filePath - file path of the config
   * @param fromRepo - specifies if file from repo or from local machine
   */
  private static async readConfigFile(filePath: string, fromRepo:  boolean): Promise<TransformerConfig>{
    // TODO ::  Validation and error handling when file not present 
    const data = await Utils.fetchFile(fromRepo, filePath);
    return <TransformerConfig> JSON.parse(data.toString());
  }

  /**
   * Register all templates provided in the transformerConfig
   * @param baseUrl - base url for the template files  
   * @param transformer - transformer whith which template should be registered 
   * @param transformerConfigs - the template transformer configs
   */
  private static async registerAllTemplates(baseUrl:string, transformer: Transformer<any> , transformerConfigs: BaseTransformConfigEntry[]): Promise<void> {
    for (let element of transformerConfigs) {
      await transformer.registerTemplate(baseUrl, element);
    }
  }
}