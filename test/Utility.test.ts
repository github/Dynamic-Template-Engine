import Utility from '../src/Utility/Utility';
import { FileReadError, EmptyFileError } from '../src/Error/FileError';
import * as nock from 'nock';

describe("Utility methods test", () => {

  it('keyGenerator method should return concatanated string as key', () => {
    const str1 = 'str1';
    const str2 = 'str2';
    const str3 = 'str3';
    expect(Utility.keyGenerator(str1, str2, str3)).toBe(`${str1}.${str2}.${str3}`);
  });

  it('keyGenerator method can take arbitary number of strings to return concatanated string', () => {
    const str1 = 'str1';
    const str2 = 'str2';
    const str3 = 'str3';
    const str4 = 'str4';
    expect(Utility.keyGenerator(str1, str2, str3, str4)).toBe(`${str1}.${str2}.${str3}.${str4}`);
  });

  it('fetchFile method should fail with error for non existant files on system', async () => {
    await expect(async () => (await Utility.fetchFile(false, 'nonExistantFilePath'))).rejects.toThrowError(FileReadError);
  });

  it('fetchFile method should fail with error for non existant files for http calls', async () => {
    await expect(async () => (await Utility.fetchFile(true, 'nonExistantFilePath'))).rejects.toThrowError(FileReadError);
  });

  it('fetchFile method should error out if file empty', () => {
    const httpSyncMethod = Utility.httpSync;
    Utility.httpSync = jest.fn();
    expect(Utility.fetchFile(true, 'nonExistantFilePath')).rejects.toThrowError(EmptyFileError);
    Utility.httpSync = httpSyncMethod;
  });

  it('httpSync method should fail with error for non existant or wrong url', () => {
    expect(Utility.httpSync('notAUrl')).rejects.toThrowError();
  });

  it('httpSync method should return contents of file', () => {
    nock('https://github.com/templateFile').get('/file').reply(200, 'test data');
    expect(Utility.httpSync('https://github.com/templateFile/file')).resolves.toBe('test data');
  });

  it.each([[404],[402]])('httpSync method should error with correct error code', async (statusCode) => {
    nock('https://github.com/templateFile').get('/file').reply( statusCode, 'Error');
    try {
      await Utility.httpSync('https://github.com/templateFile/file');
    } catch (e) {
      expect(e.message).toBe(`Http Call failed. Status Code: ${statusCode}`);
    }
  });

  it('fetchFile method should return contents of file on success', async () => {
    nock('https://github.com/templateFile').get('/file').reply(200, 'test data');
    const returnValue = await Utility.fetchFile(true, 'https://github.com/templateFile/file');
    expect(returnValue).toBe('test data');
  });
});