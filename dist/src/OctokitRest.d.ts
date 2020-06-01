export default class octokit {
    static getTransformerConfig(repo: string, branch: string): Promise<any>;
    static getTemplateFile(repo: string, branch: string, filePath: string): Promise<string>;
}
