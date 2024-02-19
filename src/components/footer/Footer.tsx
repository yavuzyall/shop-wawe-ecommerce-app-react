import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/shopwawe-logo.png';


const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo'>
                    <img src={Logo} alt='Shopwawe' />
                </div>
                <div className='footer-navigation'>
                    <div className='footer-column'>
                        <h3>Mağaza</h3>
                        <Link to='/electronics'>Elektronik</Link>
                        <Link to='/toys-and-baby'>Anne Bebek ve Oyuncak</Link>
                        <Link to='/home-and-living'>Ev ve Yaşam</Link>
                        <Link to='/fashion'>Moda ve Giyim</Link>
                        <Link to='/garden'>Bahçe, Yapı Market</Link>
                        <Link to='/sports'>Spor Outdoor</Link>
                    </div>
                    <div className='footer-column'>
                        <h3>Hizmetler</h3>
                        <Link to='/customer-service'>Müşteri Hizmetleri</Link>
                        <Link to='/terms-of-service'>Hizmet Koşulları</Link>
                        <Link to='/privacy-policy'>Gizlilik Politikası</Link>
                    </div>
                    <div className='footer-column'>
                        <h3>Bize Ulaşın</h3>
                        <p>info@shopwawe.com</p>
                        <p>+90 555 555 55 55</p>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <p>&copy; 2023 Shopwawe. Tüm hakları saklıdır.</p>
                <div className='social-media'>
                    <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>Facebook</a>
                    <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>Twitter</a>
                    <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>Instagram</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
