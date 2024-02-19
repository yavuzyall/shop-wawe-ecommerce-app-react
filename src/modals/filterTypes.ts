export interface Filter {
    label: string;
    options: string[];
}

export interface FiltersState {
    [key: string]: Filter;
}

export interface FilterIndexKey {
    [key: string]: Filter
}