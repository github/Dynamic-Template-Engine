import * as https from 'https';

export default class Utils {
  public static httpSync(url: string) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      https.get(url, (response) => {
        let chunks_of_data: Buffer[] = [];

        response.on('data', (fragments) => {
          chunks_of_data.push(fragments);
        });

        response.on('end', () => {
          let response_body = Buffer.concat(chunks_of_data);
          resolve(response_body.toString());
        });

        response.on('error', (error) => {
          reject(error);
        });
      });
    });
  }
}