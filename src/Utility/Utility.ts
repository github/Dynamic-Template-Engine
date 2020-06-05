// Copyright (c) 2020 GitHub. This code is licensed under MIT license (see LICENSE(https://github.com/github/event-transformer/blob/feature/chatops/LICENSE) for details)
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { EmptyFileError, FileReadError } from '../Error/FileError';

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
  public static async fetchFile(isHttpCall: boolean, filePath: string): Promise<string> {
    let file = '';
    try {
      if (isHttpCall) {
        file = await this.httpSync(filePath);
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
}
