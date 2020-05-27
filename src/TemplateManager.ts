import Transformer from './Transformer/Core/Transformer';
import TransformerConfig from "./Transformer/Model/TransformerConfig";
import Utils from './Utility/Utility';
import BaseTransformConfigEntry from './Transformer/Model/BaseTransformConfigEntry';
import { CardRenderer } from './Transformer/CardRenderer/CardRenderer';
import EventTransformer from './Transformer/EventTransformer/EventTransformer';
import { TemplateParseError, TemplateEngineNotFound } from './Error/TemplateErrors';
import { FileParseError, EmptyFileError } from './Error/FileError';

/**
 * Template Manager provides methods to setup the template configuration
 * intializes template engines, registers all the templates provided by the config
 */
export class TemplateManager {
  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   * @param configFilePath
   * @returns true if setup successful
   * @throws Error if setup fails
   */
  public static async setupTemplateConfiguration(configFilePath: string): Promise<boolean> {
    try {
      const transformerConfig = await this.readConfigFile(configFilePath, false);
      await this.registerAllTemplates('', new CardRenderer(), transformerConfig.cardRenderer);
      await this.registerAllTemplates('', new EventTransformer(), transformerConfig.eventTransformer);
    } catch (error) {
      if (error instanceof TemplateEngineNotFound || error instanceof TemplateParseError
        || error instanceof FileParseError || error instanceof EmptyFileError) {
        throw error;
      } else {
        throw new Error(`Setup failed for the config file path: ${configFilePath} \n ERROR: ${error.message}`)
      }
    }
    return true;
  }

  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   * @param repo - repo name ex. user/repo
   * @param branch - ex. master
   * @param configName config file name in the repo root folder
   * @returns true if setup succesful
   * @throws Error if setup fails
   */
  public static async setupTemplateConfigurationFromRepo(repo: string, branch: string, configName: string): Promise<boolean> {
    const baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}`;
    try {
      const transformerConfig = await this.readConfigFile(`${baseUrl}/${configName}.json`, true);
      await this.registerAllTemplates(baseUrl, new CardRenderer(), transformerConfig.cardRenderer);
      await this.registerAllTemplates(baseUrl, new EventTransformer(), transformerConfig.eventTransformer);
    } catch (error) {
      if (error instanceof TemplateEngineNotFound || error instanceof TemplateParseError
        || error instanceof FileParseError || error instanceof EmptyFileError) {
        throw error;
      } else {
        throw new Error(`Setup failed. \n ERROR: ${error.message}`)
      }
    }
    return true;
  }

  /**
   * Read config file and deserialize the file appropriately
   * @param filePath - file path of the config
   * @param fromRepo - specifies if file from repo or from local machine
   */
  private static async readConfigFile(filePath: string, fromRepo: boolean): Promise<TransformerConfig> {
    const data = await Utils.fetchFile(fromRepo, filePath);
    try {
      return <TransformerConfig>JSON.parse(data.toString());
    } catch (error) {
      throw new FileParseError(`Unable to parse config file from path ${filePath}, original error message: ${error.message}`);
    }
  }

  /**
   * Register all templates provided in the transformerConfig
   * @param baseUrl - base url for the template files  
   * @param transformer - transformer whith which template should be registered 
   * @param transformerConfigs - the template transformer configs
   */
  private static async registerAllTemplates(baseUrl: string, transformer: Transformer<any>, transformerConfigs: BaseTransformConfigEntry[]): Promise<void> {
    for (let element of transformerConfigs) {
      try {
        await transformer.registerTemplate(baseUrl, element);
      } catch (error) {
        if (error instanceof TemplateParseError) {
          throw new TemplateParseError(`Failed to parse template with name: ${element.TemplateName} for source type: ${element.SourceType} and template type: ${element.TemplateType}`);
        } else {
          throw error;
        }
      }
    }
  }
}