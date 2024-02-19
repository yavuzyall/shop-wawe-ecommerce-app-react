import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Products.scss';
import { ProductsState, Product } from '../../modals/IProduct';
import { getProducts } from '../../services/productService';
import StarRating from '../starrating/StarRating';
import { formatPrice, handleAddToCart, truncateString } from '../homePage/HomePage';
import { Link, useParams, useLocation } from 'react-router-dom';
import { calculateCartItemCount } from '../../functions/newItemCount';
import { updateCartItemCount } from '../../actions/cartActions';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../modals/rootState';
import { setFilters } from '../../actions/filterActions';
import { getFilters } from '../../functions/getFilters';
import Filters from '../filters/Filters';
import { filters as bilgisayarlarFilters } from '../../config/filters/bilgisayarlar';
import { filters as telefonlarFilters } from '../../config/filters/telefonlar';
import { filters as tabletlerFilters } from '../../config/filters/tabletler';
import { filters as televizyonlarFilters } from '../../config/filters/televizyonlar';
import { filters as kulakliklarFilters } from '../../config/filters/kulakliklar';
import { productTypeToCategory } from '../../modals/productTypeToCategory';


const categories: { [key: number]: string } = {
    1: "Elektronik",
    2: "Anne Bebek ve Oyuncak",
    3: "Ev ve Yaşam",
    4: "Moda ve Giyim",
    5: "Bahçe, Yapı Market",
    6: "Spor Outdoor"
};

const productTypes: { [key: string]: string } = {
    'bilgisayarlar': 'Bilgisayar',
    'telefonlar': 'Telefon',
    'televizyonlar': 'Televizyon',
    'tabletler': 'Tablet',
    'kulakliklar': 'Kulaklık',
    'oyuncaklar': 'Oyuncak',
    'akulu-araba': 'Akülü Araba',
    'arac-gerec': 'Araç & Gereç',
    'emzirme-bebek-besleme': 'Emzirme & Bebek Besleme',
    'bebek-giyim': 'Bebek Giyim',
    'ev-tekstil': 'Ev Tekstil',
    'ev-dekorasyon': 'Ev Dekorasyon',
    'yatak': 'Yatak',
    'banyo-mutfak': 'Banyo & Mutfak',
    'elektrikli-ev-aletleri': 'Elektrikli Ev Aletleri',
    'giyim': 'Giyim',
    'ayakkabi-canta': 'Ayakkabı & Çanta',
    'aksesuar-taki': 'Aksesuar & Takı',
    'cocuk': 'Çocuk',
    'bahce': 'Bahçe',
    'yapi-market': 'Yapı Market',
    'elektrik-tesisat': 'Elektrik & Tesisat',
    'is-guvenligi': 'İş Güvenliği',
    'fitness-ve-kondisyon': 'Fitness ve Kondisyon',
    'bisiklet': 'Bisiklet',
    'tekne-malzemeleri': 'Tekne Malzemeleri',
    'balikcilik-avcilik': 'Balıkçılık & Avcılık',
    'doga-sporlari': 'Doğa Sporları'

}
const Products = () => {

    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const [products, setProducts] = useState<Product[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [categoryName, setCategoryName] = useState<string | null>(null);

    const { categoryId, productType } = useParams<{ categoryId: string, productType: string }>();

    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});


    const handleFilterChange = (filterType: string, value: string) => {

        setFilterValues(prev => ({ ...prev, [filterType]: value === 'Tümü' ? '' : value }));

    };

    function mergeCommonFilters(categoryId: number, productType?: string) {
        if (productType) {
            return productTypeFilters[productType] || {};
        }

        const productTypesInCategory = Object.keys(productTypeFilters).filter(
            type => productTypeToCategory[type] === categoryId
        );

        const mergedFilters: Filters = {};

        for (const productType of productTypesInCategory) {
            const filters = productTypeFilters[productType];

            for (const filterKey of Object.keys(filters)) {
                if (!mergedFilters[filterKey]) {
                    mergedFilters[filterKey] = filters[filterKey];
                } else {
                    const existingOptions = new Set(mergedFilters[filterKey].options);
                    const newOptions = filters[filterKey].options.filter(option => !existingOptions.has(option));
                    mergedFilters[filterKey].options.push(...newOptions);
                }
            }
        }

        return mergedFilters;
    }


    useEffect(() => {
        console.log(filterValues);

    }, [filterValues]);

    useEffect(() => {
        setFilterValues({});
    }, [categoryId, productType]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let productsData;
                if (categoryId && productType) {
                    const category = categories[parseInt(categoryId)];
                    const type = productTypes[productType];
                    setCategoryName(`${category} - ${type}`);
                    productsData = await getProducts(Number(categoryId), productType, filterValues);
                } else if (categoryId) {
                    setCategoryName(categories[parseInt(categoryId)]);

                    productsData = await getProducts(Number(categoryId));
                } else {
                    productsData = await getProducts();
                }
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, productType, filterValues]);

    useEffect(() => {
        if (productType) {
            const filters = getFilters(productType);
            if (filters) {
                dispatch(setFilters(filters));
            }
        }

    }, [dispatch, productType]);

    // useEffect(() => {
    //     if (categoryId) {
    //         const mergedFilters = mergeCommonFilters(Number(categoryId));
    //         dispatch(setFilters(mergedFilters));
    //     } else if (productType) {
    //         const filters = getFilters(productType);
    //         if (filters) {
    //             dispatch(setFilters(filters));
    //         }
    //     }
    // }, [dispatch, categoryId, productType]);

    useEffect(() => {
        if (categoryId) {
            const mergedFilters = mergeCommonFilters(Number(categoryId), productType);
            dispatch(setFilters(mergedFilters));
        }
    }, [dispatch, categoryId, productType]);

    const truncateString = (str: string, num: number) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    const handleAddToCartCount = () => {
        const newItemCount = calculateCartItemCount();
        dispatch(updateCartItemCount(newItemCount))
    }




    interface Filter {
        label: string;
        options: string[];
    }

    interface Filters {
        [key: string]: Filter;
    }

    const productTypeFilters: { [key: string]: Filters } = {
        bilgisayarlar: bilgisayarlarFilters,
        telefonlar: telefonlarFilters,
        tabletler: tabletlerFilters,
        televizyonlar: televizyonlarFilters,
        kulakliklar: kulakliklarFilters
    };






    return (
        <div className='products-container'>
            <div className='filter-section'>
                <div className='filter'>
                    <Filters filters={filters} onFilterChange={handleFilterChange} />
                </div>
            </div>
            <div className='products-section'>
                {loading ? (<div>Loading...</div>) : (
                    <>
                        <div className='products-header'>
                            {categoryId || productType ? <h2>{categoryName} Ürünleri</h2> : <h2>Tüm Ürünler</h2>}

                        </div>
                        <div className='products-list'>
                            {products.map(product => (

                                <div key={product.id} className='product-item'>
                                    <Link to={`/product/${product.id}`} key={product.id} className='link'>
                                        <div className='image-div'>
                                            <img src={product.imageUrl} alt={product.name} />
                                        </div>
                                        <div className='product-info'>
                                            <div className='product-name'>
                                                <h3>{truncateString(product.name, 55)}</h3>
                                            </div>
                                            <div className='text-area'>
                                                <div className='rating'>
                                                    <StarRating rating={product.rating} />
                                                    <div className='rate-number'>{product.reviewCount} değerlendirme.</div>
                                                </div>
                                                <div className='price'>{formatPrice(product.price)} TL</div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className='products-button-container'>
                                        <button onClick={() => { handleAddToCart(product.id); handleAddToCartCount() }}>Sepete Ekle</button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </>
                )}

                <div className='pagination'>

                </div>
            </div>
        </div >
    )
}

export default Products