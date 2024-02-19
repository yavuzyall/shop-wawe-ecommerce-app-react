import React, { useEffect, useState } from 'react';
import './Account.scss';
import { red } from '@mui/material/colors';
import { IAddress } from '../../modals/IAddress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddressModal from '../addressModal/AddressModal';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { addUserAddress, deleteUserAddresses, getUserAddresses, updateUserAddress } from '../../services/orderService';
import { toast } from 'react-toastify';
import { getUsers } from '../../services/userService';
import IUser from '../../modals/IUser';
import GenderModal from '../addGenderModal/GenderModal';

const Account = () => {

    const userId = String(localStorage.getItem('user'));
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddGenderOpen, setIsAddGenderOpen] = useState<boolean>(false);
    const [selectedAddressId, setSelectedAddressId] = useState<IAddress | null>(null);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
    const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);
    const [userData, setUserData] = useState<IUser | null>(null);
    console.log(selectedAddressId);


    useEffect(() => {
        setEditingAddress(addresses.find(address => address.addressId === editingAddressId) || null);

    }, [editingAddressId])
    useEffect(() => {
        const fetchAddresses = async () => {
            const userAddresses = await getUserAddresses(userId);
            setAddresses(userAddresses);
        };
        const getUserData = async () => {
            try {
                const userResponse = await getUsers();
                const userData = userResponse.find((user: IUser) => (user.id == userId));
                if (userData) {
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Kullanıcı verileri alınırken bir hata oluştu.", error);
                
            }
            
        }
        fetchAddresses();
        getUserData();
        
    }, []);

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await deleteUserAddresses(userId, addressId);
            const updatedAddresses = await getUserAddresses(userId);
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error("Adres silinirken bir hata oluştu: ", error);
        }
    }

    const handleAddAddress = async (newAddress: IAddress) => {
        try {
            await addUserAddress(userId, newAddress);
            const updatedAddresses = await getUserAddresses(userId);
            setAddresses(updatedAddresses);
            setIsModalOpen(false);
            toast.success('Yeni adres eklendi.', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error("Adres eklenirken bir hata oluştu: ", error);

        }
    }

    const handleEditAddress = (addressId: string) => {

        setEditingAddressId(addressId);

        setIsModalOpen(true);
    }

    const handleUpdateAddress = async (updatedAddress: IAddress) => {
        try {
            await updateUserAddress(userId, updatedAddress.addressId, updatedAddress);
            const updatedAddresses = await getUserAddresses(userId);
            setAddresses(updatedAddresses);
            setIsModalOpen(false);
            toast.success('Adres başarıyla güncellendi. ', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error("Adres güncellenirken bir hata oluştu: ", error);

        };
    };

    const handleAddGender = () => {
        setIsAddGenderOpen(true);
    }

    return (
        <div className='main'>
            <h1 className='account-header'>Hesabım</h1>
            <div className='account-details-top'>
                <div className="name-img-container">
                    <div className='profile-img'>
                        <p>YY</p>
                    </div>
                    <p>{userData?.userFirstname} {userData?.userLastname}</p>
                    <p></p>

                </div>
                <div className="profile-details-container">
                    <div className='detail-left'>
                        <div className='info-line'>
                            <label htmlFor="">İsim:</label>
                            <p className='addressName'>{userData?.userFirstname}</p>
                        </div>
                        <div className='info-line'>
                            <label htmlFor="text">Soyisim:</label>
                            <p className='text'>{userData?.userLastname}</p>
                        </div>
                        <div className='info-line'>
                            <label htmlFor="text">Telefon:</label>
                            <p className='text'>{userData?.userPhone}</p>
                        </div>
                    </div>
                    <div className="detail-right">
                        <div className='info-line'>
                            <label htmlFor="text">Email:</label>
                            <p className='text'>{userData?.userMail}</p>
                        </div>
                        <div className='info-line'>
                            <label htmlFor="text">Şifre:</label>
                            <p className='text' style={{ color: 'darkorange', cursor: 'pointer' }}>Şifreni Değiştir</p>
                        </div>
                        <div className='info-line'>
                            <label htmlFor="text">Cinsiyet:</label>
                            {userData ? ('gender' in userData ? (<p className='text'>{userData.gender}</p>) : (<p onClick={handleAddGender} className='text' style={{ color: 'darkorange', cursor: 'pointer' }}>Ekle</p>)) : ('Yükleniyor...')}
                        </div>
                    </div>
                </div>
            </div>
            <div className='account-details-bottom'>
                <div className='spacing'></div>
                <div className="address-details-container">
                    <h2>Adreslerim</h2>
                    <div className='address-details'>
                        <div className='addresses'>
                            {addresses.length > 0 ? (
                                addresses.map((address, index) => (
                                    <div className='address-item'>
                                        <div className='address-header'>
                                            <h3>{address.addressName}</h3>
                                        </div>
                                        <div className='detailandicons'>
                                            <div className='address-detail'>
                                                <div className='address-name'>
                                                    <span className='h'>İsim: </span>
                                                    <span>{address.name}</span>
                                                </div>
                                                <div className='address-lastname'>
                                                    <span className='h'>Soyisim: </span>
                                                    <span>{address.lastname}</span>
                                                </div>
                                                <div className='address-phone'>
                                                    <span className='h'>Telefon Numarası: </span>
                                                    <span>{address.phoneNumber}</span>
                                                </div>
                                                <div className='address-province'>
                                                    <span className='h'>İl: </span>
                                                    <span>{address.province}</span>
                                                </div>
                                                <div className='address-district'>
                                                    <span className='h'>İlçe: </span>
                                                    <span>{address.district}</span>
                                                </div>
                                                <div className='address-neighbourhood'>
                                                    <span className='h'>Mahalle: </span>
                                                    <span>{address.neighbourhood}</span>
                                                </div>
                                                <div className='address-postcode'>
                                                    <span className='h'>Posta Kodu: </span>
                                                    <span>{address.postcode}</span>
                                                </div>
                                                <div className='address-addressLine'>
                                                    <span className='h'>Adres Satırı: </span>
                                                    <span>{address.addressLine}</span>
                                                </div>

                                            </div>
                                            <div className='icons'>
                                                <div className='edit-address' onClick={() => { handleEditAddress(address.addressId) }}>
                                                    <BorderColorIcon className='edit-symbol' />
                                                </div>
                                                <div className='delete-address' onClick={() => { handleDeleteAddress(address.addressId) }}>
                                                    <DeleteOutlineIcon className='delete-symbol' />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                ))

                            ) : (
                                <div className='empty-address-card'>
                                    <div className='empty-address-items'>
                                        <ImportContactsIcon className='empty-address-icon' />
                                        <p>Henüz bir adres eklememişsin. Hemen adresini ekle ve siparişini oluştur!!!</p>
                                    </div>
                                </div>)}
                        </div>
                        <div className='button'>
                            <div className='add-address' onClick={() => setIsModalOpen(true)}>
                                <span>Yeni Adres Ekle</span>
                                <AddCircleOutlineIcon className='add-icon' />
                            </div>
                        </div>
                        <AddressModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onAdd={handleAddAddress}
                            editingAddress={editingAddress}
                            setEditingAddress={setEditingAddress}
                            onUpdate={handleUpdateAddress}
                        />
                        <GenderModal 
                            isOpen={isAddGenderOpen}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account