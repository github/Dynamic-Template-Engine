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
     * @param {string} configName config file name in the repo root folder
     * @returns {boolean} true if setup succesful
     * @throws Error if setup fails
     */
    static setupTemplateConfigurationFromRepo(repo: string, branch: string, configName: string, sourceType: string, templateTypeString: string): Promise<boolean>;
    /**
     * Read config file and deserialize the file appropriately
     *
     * @param {string} filePath - file path of the config
     * @param {boolean} fromRepo - specifies if file from repo or from local machine
     */
    private static readConfigFile;
    /**
     * Register all templates provided in the transformerConfig
     *
     * @param {string} baseUrl - base url for the template files
     * @param {string} transformer - transformer whith which template should be registered
     * @param {BaseTransformConfigEntry} transformerConfigs - the template transformer configs
     */
    private static registerAllTemplates;
    /**
     * Register template provided in the transformerConfig for the sourceType
     *
     * @param {string} baseUrl - base url for the template files
     * @param {string} transformer - transformer whith which template should be registered
     * @param {BaseTransformConfigEntry} transformerConfigs - the template transformer configs
     */
    private static registerSpecificTemplate;
}
