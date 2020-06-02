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
    static httpSync(url: string): Promise<string>;
    /**
     * Fetch file either from local machine or using an http call
     *
     * @param {boolean} isHttpCall - is an http call or a local machine lookup
     * @param {string} filePath - the path of the file to read
     */
    static fetchFile(fromRepo: boolean, repo: string, branch: string, filePath: string): Promise<string>;
    /**
     * Creates a key based on all strings passed
     * Implementation can be changed to create a hash of all strings rather than just concating
     *
     * @param {string[]} allStrings - all strings to create a unique key
     * @returns {string} generated key
     */
    static keyGenerator(...allStrings: string[]): string;
    static getFile(repo: string, branch: string, filePath: string): Promise<string>;
}
