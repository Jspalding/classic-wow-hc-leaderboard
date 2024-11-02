import { Realm, RealmKey } from './character-stats.interface';

export interface CharacterMedia {
    _links: Links;
    character: CharacterSummary;
    assets: Asset[];
}

export interface Links {
    self: { href: string };
}

export interface CharacterSummary {
    key: RealmKey;
    name: string;
    id: number;
    realm: Realm;
}

export interface Asset {
    key: string;
    value: string;
}
