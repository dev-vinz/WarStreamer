import { Properties } from '../utils/Properties';

export class Requests {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected url(property: string, ...args: any[]): string {
    const formatString = Properties.getUrl(property);

    return this._url(formatString, ...args);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _url(formatString: string, ...args: any[]): string {
    return formatString.replace(/%[sd]/g, (match) => {
      const arg = args.shift();

      if (typeof arg === 'undefined') {
        return match;
      } else {
        return arg.toString();
      }
    });
  }
}
