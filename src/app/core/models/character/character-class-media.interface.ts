export interface CharacterClassMedia {
    _links: Links;
    assets: ClassAvatar[];
    id: number;
}

export interface Links {
    self: { href: string };
}

export interface ClassAvatar {
    key: string;
    value: string;
    file_data_id: number;
}
