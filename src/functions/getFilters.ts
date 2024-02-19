import { FiltersState } from "../modals/filterTypes";
import * as bilgisayarlar from '../config/filters/bilgisayarlar';
import * as telefonlar from '../config/filters/telefonlar';
import * as tabletler from '../config/filters/tabletler';
import * as televizyonlar from '../config/filters/televizyonlar';

export const getFilters = (productType: string): FiltersState | null => {
    switch (productType) {
        case 'bilgisayarlar':
            return bilgisayarlar.filters;
        case 'telefonlar':
            return telefonlar.filters;
        case 'tabletler':
            return tabletler.filters;
        case 'televizyonlar':
            return televizyonlar.filters;
        default:
            return null;
    }
}