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

  protected static _createBlobInstance(data: any): Blob {
    throw new Error('Not implemented');
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
    return new Font(data.id, data.displayName, data.fileName);
  }

  protected static _createFontInstances(data: any[]): Font[] {
    return data.map(Requests._createFontInstance);
  }

  protected static _createImageInstance(data: any): Image {
    return new Image(
      data.userId,
      data.name,
      Requests._convertBase64StringToFile(data.image, data.name),
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
    return new OverlaySetting(
      data.userId,
      data.fontId,
      data.textColor,
      data.logoVisible,
      data.logoSize,
      new Location2D(data.logoLocation.x, data.logoLocation.y),
      data.clanNameVisible,
      data.clanNameSize,
      new Location2D(data.clanNameLocation.x, data.clanNameLocation.y),
      data.totalStarsVisible,
      data.totalStarsSize,
      new Location2D(data.totalStarsLocation.x, data.totalStarsLocation.y),
      data.totalPercentageVisible,
      data.totalPercentageSize,
      new Location2D(
        data.totalPercentageLocation.x,
        data.totalPercentageLocation.y
      ),
      data.averageDurationVisible,
      data.averageDurationSize,
      new Location2D(
        data.averageDurationLocation.x,
        data.averageDurationLocation.y
      ),
      data.playerDetailsVisible,
      data.playerDetailsSize,
      new Location2D(
        data.playerDetailsLocation.x,
        data.playerDetailsLocation.y
      ),
      data.lastAttackToWinVisible,
      data.lastAttackToWinSize,
      new Location2D(
        data.lastAttackToWinLocation.x,
        data.lastAttackToWinLocation.y
      ),
      data.heroesEquipmentsVisible,
      data.heroesEquipmentsSize,
      new Location2D(
        data.heroesEquipmentsLocation.x,
        data.heroesEquipmentsLocation.y
      ),
      data.mirrorReflection
    );
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
      Requests._convertBase64StringToFile(data.logo, data.teamName),
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

  private static _convertBase64StringToFile(
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
