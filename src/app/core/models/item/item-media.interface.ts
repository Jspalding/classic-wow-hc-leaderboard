export interface ItemIconMedia {
    _links: ItemLinks;
    assets: ItemIcon[];
    id: number;
}

export interface ItemLinks {
    self: { href: string };
}

export interface ItemIcon {
    key: string;
    value: string;
    file_data_id: number;
}
