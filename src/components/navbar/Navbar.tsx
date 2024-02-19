import React, { useState } from 'react';
import './Navbar.scss';
import LogoTrs from '../../assets/shopwawe-logo-trs.png';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modals/rootState';
import { updateCartItemCount } from '../../actions/cartActions';

const Navbar = () => {

    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isElectronicsOpen, setIsElectronicsOpen] = useState<boolean>(false);
    const [isToysandBabyOpen, setIsToysandBabyOpen] = useState<boolean>(false);
    const user = localStorage.getItem('user');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(prev => !prev);
    }
    const toggleElectronics = () => {
        setIsElectronicsOpen(prev => !prev);
    }
    const toggleToysandBaby = () => {
        setIsToysandBabyOpen(prev => !prev);
    }

    const handleClickLogOut = () => {
        localStorage.removeItem('user');
    }

    const handleBasketClick = () => {
        navigate('/product-cart');
    }
    // const refreshCartItemCount = () => {
    //     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //     dispatch(updateCartItemCount(cart.length));
    // }

    return (
        <nav className='navbar-container'>
            <div className='overlay'></div>
            <div className='navbar-top'>
                <div className='top-in'>
                    <div className='navbar-logo'>
                        <Link to='/homepage'>
                            <img src={LogoTrs} alt="Shopwawe" />
                        </Link>
                    </div>
                    <div className='tagline'>
                        <span>Alışverişte indirim dalgası</span>
                    </div>
                    <div className='navbar-searchbar'>
                        <IconButton className='search-icon'>
                            <SearchIcon />
                        </IconButton>
                        <input type="text" placeholder='Ürün Ara...' className='navbar-search-input' />
                    </div>
                </div>
                <div className='account-items'>
                    <div className='basket-items' onClick={handleBasketClick}>
                        <ShoppingCartIcon className='basket-icon' />
                        {cartItemCount > 0 && (
                            <div className='cart-item-count'>
                                <span className='cart-item-count-span'>{cartItemCount}</span>
                            </div>
                        )}
                        <span>Sepetim</span>
                    </div>
                    <div className='a-basket-items'>
                        <ShoppingCartIcon />
                    </div>
                    {user ? (
                        <>
                            <div className='account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                                <PersonIcon />
                                <div className='spans'>
                                    <span>Hesabım</span>
                                </div>
                                {isAccountMenuOpen && (
                                    <div className='account-dropdown'>
                                        <Link to="/account-details">Hesap Bilgilerim</Link>
                                        <Link to="/myorders">Siparişlerim</Link>
                                        <Link to="/homepage" onClick={handleClickLogOut}>Çıkış</Link>
                                    </div>
                                )}
                            </div>
                            <div className='alternative-account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                                <PersonIcon />
                                {isAccountMenuOpen && (
                                    <div className='a-account-dropdown'>
                                        <Link to="/account-details">Hesap Bilgilerim</Link>
                                        <Link to="/myorders">Siparişlerim</Link>
                                        <Link to="/homepage" onClick={handleClickLogOut}>Çıkış</Link>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                                <PersonIcon />
                                <div className='spans'>
                                    <span>Giriş Yap</span>
                                    <p className='little-span'>veya Kayıt Ol</p>
                                </div>
                                {isAccountMenuOpen && (
                                    <div className='account-dropdown'>
                                        <Link to="/login">Giriş Yap</Link>
                                        <Link to="/register">Kayıt Ol</Link>
                                    </div>
                                )}
                            </div>
                            <div className='alternative-account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                                <PersonIcon />
                                {isAccountMenuOpen && (
                                    <div className='a-account-dropdown'>
                                        <Link to="/login">Giriş</Link>
                                        <Link to="/register">Kayıt</Link>
                                    </div>
                                )}
                            </div>
                        </>

                    )}
                    {/* <div className='account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                        <PersonIcon />
                        <div className='spans'>
                            <span>Giriş Yap</span>
                            <p className='little-span'>veya Kayıt Ol</p>
                        </div>
                        {isAccountMenuOpen && (
                            <div className='account-dropdown'>
                                <Link to="/login">Giriş Yap</Link>
                                <Link to="/register">Kayıt Ol</Link>
                            </div>
                        )}
                    </div>
                    <div className='alternative-account' onMouseEnter={() => setIsAccountMenuOpen(true)} onMouseLeave={() => setIsAccountMenuOpen(false)}>
                        <PersonIcon />
                        {isAccountMenuOpen && (
                            <div className='a-account-dropdown'>
                                <Link to="/login">Giriş</Link>
                                <Link to="/register">Kayıt</Link>
                            </div>
                        )}
                    </div> */}
                    <div className='a-menu'>
                        <MenuIcon className='mobile-menu-icon' onClick={handleMobileMenuToggle} />
                    </div>
                    {isMobileMenuOpen && (
                        <div className='mobile-menu'>
                            <div className='close-div' onClick={handleMobileMenuToggle}>
                                <CloseIcon />
                            </div>
                            <div className='m-menu-item'>
                                <div onClick={toggleElectronics}>
                                    <p>Elektronik</p>
                                    <KeyboardArrowDownIcon />
                                    {isElectronicsOpen && (
                                        <div className='submenu'>
                                            <div className='submenu-item'>Bilgisayarlar</div>
                                            <div className='submenu-item'>Telefonlar</div>
                                            <div className='submenu-item'>Televizyonlar</div>
                                            <div className='submenu-item'>Telefonlar</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='m-menu-item'>
                                <div onClick={toggleToysandBaby}>
                                    <p>Anne Bebek ve Oyuncak</p>
                                    <KeyboardArrowDownIcon />
                                    {isToysandBabyOpen && (
                                        <div className='submenu'>
                                            <div className='submenu-item'>Oyuncaklar</div>
                                            <div className='submenu-item'>Akülü Araba</div>
                                            <div className='submenu-item'>Araç & Gereç</div>
                                            <div className='submenu-item'>Emzirme & Bebek Besleme</div>
                                            <div className='submenu-item'>Bebek Giyim</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
            <div className='navbar-divider'></div>
            <div className='navbar-product-categories'>
                <Link to='/products/1'>
                    <div className='menu-item'>
                        Elektronik
                        <div className='submenu'>
                            <Link to='/products/1/bilgisayarlar'><div className='submenu-item'>Bilgisayarlar</div></Link>
                            <Link to='/products/1/telefonlar'><div className='submenu-item'>Telefonlar</div></Link>
                            <Link to='/products/1/televizyonlar'><div className='submenu-item'>Televizyonlar</div></Link>
                            <Link to='/products/1/tabletler'><div className='submenu-item'>Tabletler</div></Link>
                            <Link to='/products/1/kulakliklar'><div className='submenu-item'>Kulaklıklar</div></Link>
                        </div>
                    </div>
                </Link>
                <Link to='/products/2'>
                    <div className='menu-item'>
                        Anne Bebek ve Oyuncak
                        <div className='submenu'>
                            <Link to='/products/2/oyuncaklar'><div className='submenu-item'>Oyuncaklar</div></Link>
                            <Link to='/products/2/akulu-araba'><div className='submenu-item'>Akülü Araba</div></Link>
                            <Link to='/products/2/arac-gerec'><div className='submenu-item'>Araç & Gereç</div></Link>
                            <Link to='/products/2/emzirme-bebek-besleme'><div className='submenu-item'>Emzirme & Bebek Besleme</div></Link>
                            <Link to='/products/2/bebek-giyim'><div className='submenu-item'>Bebek Giyim</div></Link>
                        </div>
                    </div>
                </Link>
                <Link to='/products/3'>
                    <div className='menu-item'>
                        Ev ve Yaşam
                        <div className='submenu'>
                            <Link to='/products/3/ev-tekstil'><div className='submenu-item'>Ev Tekstil</div></Link>
                            <Link to='/products/3/ev-dekorasyon'><div className='submenu-item'>Ev Dekorasyon</div></Link>
                            <Link to='/products/3/yatak'><div className='submenu-item'>Yatak</div></Link>
                            <Link to='/products/3/banyo-mutfak'><div className='submenu-item'>Banyo & Mutfak</div></Link>
                            <Link to='/products/3/elektrikli-ev-aletleri'><div className='submenu-item'>Elektrikli Ev Aletleri</div></Link>
                        </div>
                    </div>
                </Link>
                <Link to='/products/4'>
                    <div className='menu-item'>
                        Moda ve Giyim
                        <div className='submenu'>
                            <Link to='/products/4/giyim'><div className='submenu-item'>Giyim</div></Link>
                            <Link to='/products/4/ayakkabi-canta'><div className='submenu-item'>Ayakkabı & Çanta</div></Link>
                            <Link to='/products/4/aksesuar-taki'><div className='submenu-item'>Aksesuar & Takı</div></Link>
                            <Link to='/products/4/cocuk'><div className='submenu-item'>Çocuk</div></Link>
                        </div>
                    </div>
                </Link>
                <Link to='/products/5'>
                    <div className='menu-item'>
                        Bahçe, Yapı Market
                        <div className='submenu'>
                            <Link to='/products/5/bahce'><div className='submenu-item'>Bahçe</div></Link>
                            <Link to='/products/5/banyo-mutfak'><div className='submenu-item'>Banyo & Mutfak</div></Link>
                            <Link to='/products/5/yapi-market'><div className='submenu-item'>Yapı Market</div></Link>
                            <Link to='/products/5/elektrik-tesisat'><div className='submenu-item'>Elektrik & Tesisat</div></Link>
                            <Link to='/products/5/is-guvenligi'><div className='submenu-item'>İş Güvenliği</div></Link>
                        </div>
                    </div>
                </Link>
                <Link to='/products/6'>
                    <div className='menu-item'>
                        Spor Outdoor
                        <div className='submenu'>
                            <Link to='/products/6/fitness-ve-kondisyon'><div className='submenu-item'>Fitness ve Kondisyon</div></Link>
                            <Link to='/products/6/bisiklet'><div className='submenu-item'>Bisiklet</div></Link>
                            <Link to='/products/6/tekne-malzemeleri'><div className='submenu-item'>Tekne Malzemeleri</div></Link>
                            <Link to='/products/6/balikcilik-avcilik'><div className='submenu-item'>Balıkçılık & Avcılık</div></Link>
                            <Link to='/products/6/doga-sporlari'><div className='submenu-item'>Doğa Sporları</div></Link>
                        </div>
                    </div>
                </Link>
            </div>

        </nav>

    )
}

export default Navbar