import { environment } from '../../../../environments/environment';

export class Properties {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private static readonly API_URLS: { [key: string]: string } = {
    accounts: `${environment.apiUrl}/accounts`,
    'accounts.get': `${environment.apiUrl}/accounts/%s`,

    'coc.clan.get': `${environment.apiUrl}/coc/clans/%s`,
    'coc.clan.get.byTag': `${environment.apiUrl}/coc/clans/tag/%s`,
    'coc.clan.get.byName': `${environment.apiUrl}/coc/clans/name/%s`,
    'coc.clan.get.war': `${environment.apiUrl}/coc/clans/%s/war`,

    'coc.player.get': `${environment.apiUrl}/coc/players/%s`,
    'coc.player.verify': `${environment.apiUrl}/coc/players/%s/verifytoken`,

    fonts: `${environment.apiUrl}/fonts`,
    'fonts.get': `${environment.apiUrl}/fonts/%s`,

    images: `${environment.apiUrl}/images`,
    'images.get': `${environment.apiUrl}/images/%s`,

    languages: `${environment.apiUrl}/languages`,
    'languages.get': `${environment.apiUrl}/languages/%s`,

    overlay: `${environment.apiUrl}/overlaysetting`,
    'overlay.getDefaultById': `${environment.apiUrl}/overlaysetting/defaults/%s`,
    'overlay.images': `${environment.apiUrl}/overlaysetting/images`,

    teamlogos: `${environment.apiUrl}/teamlogos`,
    'teamlogos.get': `${environment.apiUrl}/teamlogos/%s`,

    user: `${environment.apiUrl}/user`,
    'user.language': `${environment.apiUrl}/user/language`,

    waroverlays: `${environment.apiUrl}/waroverlays`,
    'waroverlays.get': `${environment.apiUrl}/waroverlays/%d`,
  };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * *\
  |*              STATIC             *|
  \* * * * * * * * * * * * * * * * * */

  public static getUrl(key: string): string {
    return this.API_URLS[key];
  }
}
