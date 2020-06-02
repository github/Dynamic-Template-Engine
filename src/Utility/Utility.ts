import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { EmptyFileError, FileReadError } from '../Error/FileError';
import { Octokit } from '@octokit/rest';

/**
 * Utility functions available to the whole code base
 */
export default class Utility {
  /**
   * A synchoronous http call
   *
   * @param {string} url - url to make the http call to
   * @returns {string} response string
   */
  public static httpSync(url: string) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      https.get(url, (response) => {
        const { statusCode } = response;
        if (statusCode !== 200) {
          reject(new Error(`Http Call failed. Status Code: ${statusCode}`));
        }
        const chunks_of_data: Buffer[] = [];

        response.on('data', (fragments) => {
          chunks_of_data.push(fragments);
        });

        response.on('end', () => {
          const response_body = Buffer.concat(chunks_of_data);
          resolve(response_body.toString());
        });

        response.on('error', (error) => {
          reject(error);
        });
      });
    });
  }

  /**
   * Fetch file either from local machine or using an http call
   *
   * @param {boolean} isHttpCall - is an http call or a local machine lookup
   * @param {string} filePath - the path of the file to read
   */
  public static async fetchFile(fromRepo: boolean, repo: string, branch: string, filePath: string): Promise<string> {
    let file = '';
    try {
      if (fromRepo) {
        file = await this.getFile(repo, branch, filePath);
      } else {
        file = fs.readFileSync(path.resolve(__dirname, `../${filePath}`)).toString();
      }
    } catch (error) {
      throw new FileReadError(`Could not read file with 
        file path: ${filePath} \n ERROR: ${error.message}`);
    }
    if (!file || file.length <= 0) {
      throw new EmptyFileError(`Empty file at path: ${filePath}`);
    }
    return file;
  }

  /**
   * Creates a key based on all strings passed
   * Implementation can be changed to create a hash of all strings rather than just concating
   *
   * @param {string[]} allStrings - all strings to create a unique key
   * @returns {string} generated key
   */
  public static keyGenerator(...allStrings: string[]): string {
    let genratedKey = '';
    allStrings.forEach(element => {
      genratedKey += `${element}.`;
    });
    return genratedKey.slice(0, genratedKey.length - 1);
  }

  public static async getFile(repo: string, branch: string, filePath: string) {
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
