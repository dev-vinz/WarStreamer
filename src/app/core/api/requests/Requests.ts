import { Account } from '../models/Account';
import { ClashBadgeUrls } from '../models/ClashBadgeUrls';
import { ClashClan } from '../models/ClashClan';
import { ClashHero } from '../models/ClashHero';
import { ClashHeroEquipment } from '../models/ClashHeroEquipment';
import { ClashPlayer } from '../models/ClashPlayer';
import { ClashToken } from '../models/ClashToken';
import { Font } from '../models/Font';
import { Image } from '../models/Image';
import { Language } from '../models/Language';
import { Location2D } from '../models/Location2D';
import { OverlaySetting } from '../models/OverlaySetting';
import { TeamLogo } from '../models/TeamLogo';
import { User } from '../models/User';
import { WarOverlay } from '../models/WarOverlay';

import { Properties } from '../utils/Properties';

import moment from 'moment';

export class Requests {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROTECTED                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  protected url(property: string, ...args: any[]): string {
    const formatString = Properties.getUrl(property);

    return this._url(formatString, ...args);
  }

  /* * * * * * * * * * * * * * * * * *\
  |*              STATIC             *|
  \* * * * * * * * * * * * * * * * * */

  protected static _createAccountInstance(data: any): Account {
    return new Account(data.tag, data.userId);
  }

  protected static _createAccountInstances(data: any[]): Account[] {
    return data.map(Requests._createAccountInstance);
  }

  protected static _createBooleanInstance(data: any): boolean {
    return new Boolean(data).valueOf();
  }

  protected static _createClashClanInstance(data: any): ClashClan {
    const badges = new ClashBadgeUrls(
      data.badgeUrls.large,
      data.badgeUrls.medium,
      data.badgeUrls.small
    );

    return new ClashClan(data.tag, data.name, badges);
  }

  protected static _createClashClanInstances(data: any[]): ClashClan[] {
    return data.map(Requests._createClashClanInstance);
  }

  protected static _createClashHeroInstance(data: any): ClashHero {
    const equipments = Requests._createClashHeroEquipmentInstances(
      data.equipment
    );
    return new ClashHero(data.name, data.level, equipments);
  }

  protected static _createClashHeroInstances(data: any[]): ClashHero[] {
    return data.map(Requests._createClashHeroInstance);
  }

  protected static _createClashHeroEquipmentInstance(
    data: any
  ): ClashHeroEquipment {
    return new ClashHeroEquipment(data.name, data.level);
  }

  protected static _createClashHeroEquipmentInstances(
    data: any[]
  ): ClashHeroEquipment[] {
    return data.map(Requests._createClashHeroEquipmentInstance);
  }

  protected static _createClashPlayerInstance(data: any): ClashPlayer {
    const clan = Requests._createClashClanInstance(data.clan);
    const heroes = Requests._createClashHeroInstances(
      data.heroes.filter((h: any) => h.village === 0)
    );

    return new ClashPlayer(
      data.tag,
      data.name,
      data.townHallLevel,
      heroes,
      clan
    );
  }

  protected static _createClashPlayerInstances(data: any[]): ClashPlayer[] {
    return data.map(Requests._createClashPlayerInstance);
  }

  protected static _createClashTokenInstance(data: any): ClashToken {
    return new ClashToken(data.tag, data.token, data.status);
  }

  protected static _createFontInstance(data: any): Font {
    return new Font(
      data.id,
      data.displayName,
      data.familyName,
      Requests._convertBase64StringToFileFont(data.file)
    );
  }

  protected static _createFontInstances(data: any[]): Font[] {
    return data.map(Requests._createFontInstance);
  }

  protected static _createImageInstance(data: any): Image {
    return new Image(
      data.userId,
      data.name,
      Requests._convertBase64StringToFileImage(data.image, data.name),
      new Location2D(data.location.x, data.location.y),
      data.width,
      data.height,
      data.isUsed
    );
  }

  protected static _createImageInstances(data: any[]): Image[] {
    return data.map(Requests._createImageInstance);
  }

  protected static _createLanguageInstance(data: any): Language {
    return new Language(
      data.id,
      data.cultureInfo,
      data.displayValue,
      data.shortcutValue,
      data.flagEmoji
    );
  }

  protected static _createLanguageInstances(data: any[]): Language[] {
    return data.map(Requests._createLanguageInstance);
  }

  protected static _createOverlaySettingInstance(data: any): OverlaySetting {
    const setting = new OverlaySetting(data.userId, data.textColor);

    setting.fontId = data.fontId;

    setting.logoVisible = data.logoVisible;
    setting.logoSize = data.logoSize;
    setting.logoLocation = data.logoLocation
      ? new Location2D(data.logoLocation.x, data.logoLocation.y)
      : undefined;

    setting.clanNameVisible = data.clanNameVisible;
    setting.clanNameSize = data.clanNameSize;
    setting.clanNameLocation = data.clanNameLocation
      ? new Location2D(data.clanNameLocation.x, data.clanNameLocation.y)
      : undefined;

    setting.totalStarsVisible = data.totalStarsVisible;
    setting.totalStarsSize = data.totalStarsSize;
    setting.totalStarsLocation = data.totalStarsLocation
      ? new Location2D(data.totalStarsLocation.x, data.totalStarsLocation.y)
      : undefined;

    setting.totalPercentageVisible = data.totalPercentageVisible;
    setting.totalPercentageSize = data.totalPercentageSize;
    setting.totalPercentageLocation = data.totalPercentageLocation
      ? new Location2D(
          data.totalPercentageLocation.x,
          data.totalPercentageLocation.y
        )
      : undefined;

    setting.averageDurationVisible = data.averageDurationVisible;
    setting.averageDurationSize = data.averageDurationSize;
    setting.averageDurationLocation = data.averageDurationLocation
      ? new Location2D(
          data.averageDurationLocation.x,
          data.averageDurationLocation.y
        )
      : undefined;

    setting.playerDetailsVisible = data.playerDetailsVisible;
    setting.playerDetailsSize = data.playerDetailsSize;
    setting.playerDetailsLocation = data.playerDetailsLocation
      ? new Location2D(
          data.playerDetailsLocation.x,
          data.playerDetailsLocation.y
        )
      : undefined;

    setting.lastAttackToWinVisible = data.lastAttackToWinVisible;
    setting.lastAttackToWinSize = data.lastAttackToWinSize;
    setting.lastAttackToWinLocation = data.lastAttackToWinLocation
      ? new Location2D(
          data.lastAttackToWinLocation.x,
          data.lastAttackToWinLocation.y
        )
      : undefined;

    setting.heroesEquipmentsVisible = data.heroesEquipmentsVisible;
    setting.heroesEquipmentsSize = data.heroesEquipmentsSize;
    setting.heroesEquipmentsLocation = data.heroesEquipmentsLocation
      ? new Location2D(
          data.heroesEquipmentsLocation.x,
          data.heroesEquipmentsLocation.y
        )
      : undefined;

    setting.mirrorReflection = data.mirrorReflection;

    return setting;
  }

  protected static _createOverlaySettingInstances(
    data: any[]
  ): OverlaySetting[] {
    return data.map(Requests._createOverlaySettingInstance);
  }

  protected static _createTeamLogoInstance(data: any): TeamLogo {
    return new TeamLogo(
      data.teamName,
      data.userId,
      Requests._convertBase64StringToFileImage(data.logo, data.teamName),
      data.clanTags
    );
  }

  protected static _createTeamLogoInstances(data: any[]): TeamLogo[] {
    return data.map(Requests._createTeamLogoInstance);
  }

  protected static _createUserInstance(data: any): User {
    return new User(data.id, data.languageId, data.tierLevel, data.newsLetter);
  }

  protected static _createUserInstances(data: any[]): User[] {
    return data.map(Requests._createUserInstance);
  }

  protected static _createWarOverlayInstance(data: any): WarOverlay {
    return new WarOverlay(
      data.userId,
      data.id,
      data.clanTag,
      moment(data.lastCheckout),
      data.isEnded
    );
  }

  protected static _createWarOverlayInstances(data: any[]): WarOverlay[] {
    return data.map(Requests._createWarOverlayInstance);
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

  /* * * * * * * * * * * * * * * * * *\
  |*              STATIC             *|
  \* * * * * * * * * * * * * * * * * */

  private static _convertBase64StringToFileFont(base64: string): File {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: 'application/font-woff' });
    return new File([blob], 'font.woff', { type: 'application/font-woff' });
  }

  private static _convertBase64StringToFileImage(
    base64: string,
    name: string
  ): File {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: 'image/png' });
    return new File([blob], `${name}.png`, { type: 'image/png' });
  }
}
