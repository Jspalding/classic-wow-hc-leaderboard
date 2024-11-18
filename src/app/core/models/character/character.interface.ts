import {
    ActiveSpec,
    CharacterClass,
    Faction,
    Gender,
    Guild,
    Links,
    Race,
    Realm,
} from './character-stats.interface';

export interface Character {
    _links: Links;
    id: number;
    name: string;
    gender: Gender;
    faction: Faction;
    race: Race;
    character_class: CharacterClass;
    active_spec: ActiveSpec;
    realm: Realm;
    guild: Guild;
    level: number;
    experience: number;
    titles: Titles;
    pvp_summary: PvpSummary;
    media: Media;
    hunter_pets: HunterPets;
    last_login_timestamp: number;
    average_item_level: number;
    equipped_item_level: number;
    specializations: Specializations;
    statistics: Statistics;
    equipment: Equipment;
    appearance: Appearance;
    is_ghost: boolean;
    is_self_found: boolean;
    isFirst?: boolean;
    playerName: string;
}

export interface Titles {
    href: string;
}

export interface PvpSummary {
    href: string;
}

export interface Media {
    href: string;
}

export interface HunterPets {
    href: string;
}

export interface Specializations {
    href: string;
}

export interface Statistics {
    href: string;
}

export interface Equipment {
    href: string;
}

export interface Appearance {
    href: string;
}
