import { Octokit } from '@octokit/rest';

export default class octokit{

    public static async getTransformerConfig(repo: string, branch: string) {
        try{
            const client = new Octokit();
            const ownerName = repo.split('/')[0];
            const repoName = repo.split('/')[1];
            const response = await client.repos.getContents({
                owner: ownerName,
                repo: repoName,
                path: 'TransformerConfig.json',
                ref: branch,
            });
            const configFile : any = response.data;
            if (!configFile.content) {
                throw new Error("Could not fetch config file")
            }
            const content = Buffer.from(configFile.content, 'base64').toString();
            const TransformerConfig = JSON.parse(content);
            return TransformerConfig;
            }
            catch(error){
                throw new Error(error.message);
        }
    }

    public static async getTemplateFile(repo: string, branch: string, filePath: string) {
        try{
            const client = new Octokit();
            const ownerName = repo.split('/')[0];
            const repoName = repo.split('/')[1];
            const response = await client.repos.getContents({
                owner: ownerName,
                repo: repoName,
                path: filePath,
                ref: branch,
            });
            const templateFile : any = response.data;
            if (!templateFile.content) {
                throw new Error("Could not fetch template file")
            }
            const template = Buffer.from(templateFile.content, 'base64').toString();
            return template;
        }
        catch(error){
            throw new Error(error.message);
        }
    }
}