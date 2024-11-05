import { Realm } from './character-stats.interface';

export interface CharacterGear {
    _links: Links;
    character: CharacterShort;
    equipped_items: EquippedItem[];
    equipped_item_sets: any[];
}

export interface Links {
    self: { href: string };
}

export interface CharacterShort {
    key: { href: string };
    name: string;
    id: number;
    realm: Realm;
}

export interface EquippedItem {
    item: { key: { href: string }; id: string };
    item_class: ItemClass;
    item_subclass: ItemClass;
    slot: ItemSlot;
    quantity: number;
    quality: ItemQuality;
    name: StringByLocale;
    media: { key: { href: string } };
    inventory_type: InventoryType;
    binding: ItemBinding;
    armor?: ItemArmor;
    stats?: ItemStat;
    sell_price: ItemSellPrice;
    durability: ItemDurability;
    requirements?: ItemRequirements;
    enchantments?: ItemEnchantment;
    weapon?: ItemWeaponInfo;
}

export interface ItemSlot {
    type: string;
    name: StringByLocale;
}

export interface ItemQuality {
    type: string;
    name: StringByLocale;
}

export interface ItemClass {
    key: { key: { href: string } };
    name: StringByLocale;
    id: number;
}

export interface InventoryType {
    type: string;
    name: StringByLocale;
}

export interface ItemBinding {
    type: string;
    name: StringByLocale;
}

export interface ItemArmor {
    value: number;
    display: ItemStatDisplay;
}

export interface ItemStat {
    type: { type: string; name: StringByLocale };
    value: number;
    display: ItemStatDisplay;
}

export interface ItemSellPrice {
    value: number;
    display_strings: {
        header: StringByLocale;
        gold: StringByLocale;
        silver: StringByLocale;
        copper: StringByLocale;
    };
}

export interface ItemWeaponInfo {
    damage: WeaponDamage;
    attack_speed: { value: number; display_string: StringByLocale };
    dps: { value: number; display_string: StringByLocale };
}

export interface WeaponDamage {
    min_value: number;
    max_value: number;
    display_string: StringByLocale;
    damage_class: { type: string; name: StringByLocale };
}

export interface ItemEnchantment {
    display_string: StringByLocale;
    enchantment_id: number;
    enchantment_slot: { id: number };
}

export interface ItemDurability {
    value: number;
    display_string: StringByLocale;
}

export interface ItemRequirements {
    level: { display_string: StringByLocale; value: number };
}

export interface ItemStatDisplay {
    display_string: StringByLocale;
    color: ItemRGB;
}

export interface ItemRGB {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface StringByLocale {
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
