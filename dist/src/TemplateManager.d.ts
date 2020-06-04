import { ClientType, TemplateType } from 'Transformer/Core/TransformContract';
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
    static setupTemplateConfiguration(configFilePath: string): Promise<boolean>;
    /**
     * Sets up the templates, picking from the path provided,
     * registering them to appropriate engines
     *
     * @param {string} repo - repo name ex. user/repo
     * @param {string} branch - ex. master
     * @param {string} sourceType - event that triggered the workflow
     * @param {TemplateType} templateType - type of templating engine ex. Handlebars, Liquid
     * @param {ClientType} clientType - type of client ie Teams
     * @param {string} accessToken - access token for private repo
     * @returns {boolean} true if setup succesful
     * @throws Error if setup fails
     */
    static setupTemplateConfigurationFromRepo(repo: string, branch: string, sourceType?: string, templateType?: TemplateType, clientType?: ClientType, accessToken?: string): Promise<boolean>;
    /**
     * Read config file and deserialize the file appropriately
     *
     * @param {string} filePath - file path of the config
     * @param {string} repo - repo with the config
     * @param {string} branch - branch with the config
     * @param {boolean} fromRepo - specifies if file from repo or from local machine
     */
    private static readConfigFile;
    /**
     * Register all templates provided in the transformerConfig
     *
     * @param {boolean} fromRepo - is an from repo or a local machine lookup
     * @param {string} transformer - transformer whith which template should be registered
     * @param {BaseTransformConfigEntry} transformerConfigs - the template transformer configs
     * @param {string} repo - repo with the config
     * @param {string} branch - branch with the config
     * @param {string} accessToken - access token for private repo
     */
    private static registerAllTemplates;
    /**
     * Register template provided in the transformerConfig for the sourceType
     *
     * @param {boolean} fromRepo - is an from repo or a local machine lookup
     * @param {string} transformer - transformer whith which template should be registered
     * @param {BaseTransformConfigEntry} transformerConfigs - the template transformer configs
     * @param {string} repo - repo with the config
     * @param {string} branch - branch with the config
     * @param {string} sourceType - event that triggered the workflow
     * @param {TemplateType} templateType - type of templating engine ex. Handlebars, Liquid
     * @param {ClientType} clientType - type of client ie Teams
     * @param {string} accessToken - access token for private repo
     */
    private static registerSpecificTemplate;
}
