export interface Links {
  self: { href: string };
}

export interface Gender {
  type: string;
  name: GenderStringByLocale;
}
export interface GenderStringByLocale {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface Faction {
  type: string;
  name: FactionStringByLocale;
}
export interface FactionStringByLocale {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface Race {
  key: RaceKey;
  name: RaceStringByLocale;
  id: number;
}
export interface RaceKey {
  href: string;
}
export interface RaceStringByLocale {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface CharacterClass {
  key: ClassKey;
  name: ClassStringByLocale;
  id: number;
}
export interface ClassKey {
  href: string;
}
export interface ClassStringByLocale {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface ActiveSpec {
  key: ActiveSpecKey;
  id: number;
}
export interface ActiveSpecKey {
  href: string;
}

export interface Realm {
  key: RealmKey;
  name: RealmStringByLocale;
  id: number;
  slug: string;
}
export interface RealmKey {
  href: string;
}
export interface RealmStringByLocale {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface Guild {
  key: GuildKey;
  name: string;
  id: number;
  realm: Realm;
  faction: Faction;
}

export interface GuildKey {
  href: string;
}
