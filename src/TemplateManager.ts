// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/dynamic-template-engine/blob/master/LICENSE) for details)
import * as path from 'path';
import CustomEngineOptions from './Transformer/Model/CustomEngineOptions';
import TemplateEngineFactory from './Template/Core/TemplateEngineFactory';
import Transformer from './Transformer/Core/Transformer';
import TransformerConfig from './Transformer/Model/TransformerConfig';
import BaseTransformConfigEntry from './Transformer/Model/BaseTransformConfigEntry';
import CardRenderer from './Transformer/CardRenderer/CardRenderer';
import EventTransformer from './Transformer/EventTransformer/EventTransformer';
import { TemplateParseError, TemplateEngineNotFound } from './Error/TemplateError';
import { FileParseError, EmptyFileError } from './Error/FileError';
import CustomTemplatingOptions from './Transformer/Model/CustomTemplatingOptions';
import Utils from './Utility/Utility';
import { FunctionalityNotSupportedError, CustomHelperRegisterError, CustomTagRegisterError } from './Error/FunctionalityError';

/**
 * Template Manager provides methods to setup the template configuration
 * intializes template engines, registers all the templates provided by the config
 */
export default class TemplateManager {
  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   *
   * @param {string} configFilePath - path of the config file
   * @returns {boolean} true if setup successful
   * @throws Error if setup fails
   */
  public static async setupTemplateConfiguration(configFilePath: string,
    customOptions?: CustomTemplatingOptions): Promise<boolean> {
    try {
      const baseUrl = configFilePath.substring(0, configFilePath.lastIndexOf(path.sep));
      const transformerConfig = await this.readConfigFile(configFilePath, false);
      customOptions?.engineOptions?.forEach(engineOption => {
        this.registerHelpersAndTags(engineOption);
      });
      await this.registerAllTemplates(baseUrl, new CardRenderer(), transformerConfig.cardRenderer);
      await this.registerAllTemplates(baseUrl, new EventTransformer(),
        transformerConfig.eventTransformer);
    } catch (error) {
      const defaultMessage = `Setup failed for the config file path: ${configFilePath} \n ERROR: ${error.message}`;
      throw TemplateManager.handleErrors(error, defaultMessage);
    }
    return true;
  }

  /**
   * Sets up the templates, picking from the path provided,
   * registering them to appropriate engines
   *
   * @param {string} repo - repo name ex. user/repo
   * @param {string} branch - ex. master
   * @param {string} configName config file name in the repo root folder
   * @returns {boolean} true if setup succesful
   * @throws Error if setup fails
   */
  public static async setupTemplateConfigurationFromRepo(repo: string, branch: string,
    configName: string, customOptions?: CustomTemplatingOptions): Promise<boolean> {
    const baseUrl = `https://raw.githubusercontent.com/${repo}/${branch}`;
    try {
      const transformerConfig = await this.readConfigFile(`${baseUrl}/${configName}.json`, true);
      customOptions?.engineOptions?.forEach(engineOption => {
        this.registerHelpersAndTags(engineOption);
      });
      await this.registerAllTemplates(baseUrl, new CardRenderer(),
        transformerConfig.cardRenderer);
      await this.registerAllTemplates(baseUrl, new EventTransformer(),
        transformerConfig.eventTransformer);
    } catch (error) {
      const defaultMessage = `Setup failed for repo: ${repo} and branch: ${branch}. \n ERROR: ${error.message}`;
      throw TemplateManager.handleErrors(error, defaultMessage);
    }
    return true;
  }

  /**
   * Read config file and deserialize the file appropriately
   *
   * @param {string} filePath - file path of the config
   * @param {boolean} fromRepo - specifies if file from repo or from local machine
   */
  private static async readConfigFile(filePath: string,
    fromRepo: boolean): Promise<TransformerConfig> {
    const data = await Utils.fetchFile(fromRepo, filePath);
    try {
      return <TransformerConfig>JSON.parse(data.toString());
    } catch (error) {
      throw new FileParseError(`Unable to parse config file from path 
      ${filePath}, original error message: ${error.message}`);
    }
  }
  /**
   * Register all templates provided in the transformerConfig
   *
   * @param {string} baseUrl - base url for the template files
   * @param {string} transformer - transformer whith which template should be registered
   * @param {BaseTransformConfigEntry} transformerConfigs - the template transformer configs
   */
  private static async registerAllTemplates(baseUrl: string, transformer: Transformer<any>,
    transformerConfigs: BaseTransformConfigEntry[]): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const element of transformerConfigs) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await transformer.registerTemplate(baseUrl, element);
      } catch (error) {
        if (error instanceof TemplateParseError) {
          throw new TemplateParseError(`Failed to parse template with name: ${element.TemplateName} 
          for source type: ${element.SourceType} and template type: ${element.TemplateType} with original message: ${error.message}`);
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Registers custom helpers and tags for a specific template engine
   *
   * @param {CustomEngineOptions} engineOption template type and the list of
   * custom helpers and tag to register
   */
  private static registerHelpersAndTags(engineOption: CustomEngineOptions): void {
    const engine = TemplateEngineFactory.getInstance().getTemplateEngine(engineOption.templateType);
    const helpers = engineOption.customHelpers;
    if (helpers) {
      Object.keys(helpers).forEach(helperName => {
        engine.registerHelper(helperName, helpers[helperName]);
      });
    }
    const tags = engineOption.customTags;
    if (tags) {
      Object.keys(tags).forEach(tagName => {
        engine.registerTag(tagName, tags[tagName]);
      });
    }
  }

  /**
   * Determine the correct error type and respond accordingly.
   *
   * @param {Error} error error to be analyzed
   * @param {string} defaultMessage message to show when error is not a known type
   * @returns {Error} correct error to throw
   */
  private static handleErrors(error: Error, defaultMessage: string): Error {
    if (error instanceof TemplateEngineNotFound || error instanceof TemplateParseError
      || error instanceof FileParseError || error instanceof EmptyFileError
      || error instanceof FunctionalityNotSupportedError
      || error instanceof CustomHelperRegisterError
      || error instanceof CustomTagRegisterError) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      return error;
    } else {
      return new Error(defaultMessage);
    }
  }
}
