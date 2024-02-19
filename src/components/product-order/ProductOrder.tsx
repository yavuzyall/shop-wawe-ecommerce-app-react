import React, { useEffect, useState } from 'react';
import './ProductOrder.scss';
import { addOrder, addUserAddress, deleteUserAddresses, getUserAddresses, updateUserAddress } from '../../services/orderService';
import { IAddress } from '../../modals/IAddress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddressModal from '../addressModal/AddressModal';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


const ProductOrder = () => {

  const navigate = useNavigate();

  const userId = String(localStorage.getItem('user'));
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<IAddress | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);
  console.log(selectedAddressId);


  useEffect(() => {
    setEditingAddress(addresses.find(address => address.addressId === editingAddressId) || null);

  }, [editingAddressId])
  useEffect(() => {
    const fetchAddresses = async () => {
      const userAddresses = await getUserAddresses(userId);
      setAddresses(userAddresses);
    };
    fetchAddresses();
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

  const handleAddressClick = (address: IAddress) => {
    setSelectedAddressId(address);
  }

  const handlePlaceOrder = async () => {
    if (selectedAddressId) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      try {
        await addOrder(userId, cart, selectedAddressId);
        toast.success("Sipariş başarıyla verildi.", {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        localStorage.setItem('cart', JSON.stringify([]));
        navigate('/homepage');

      } catch (error) {
        console.error("Sipariş kaydedilirken bir hata meydana geldi.", error);
      }

    } else {
      toast.error("Bir adres seçimi yapılmalı.", {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className='order-page-container'>
      <div className='order-header'>
        <h2>Adres Seçin</h2>
      </div>
      <div className='order-addresses'>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div className={`address-item ${selectedAddressId === address ? 'selected' : ''}`} key={index} onClick={() => handleAddressClick(address)}>
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
      <div className='buttons'>
        <div className='add-address' onClick={() => setIsModalOpen(true)}>
          <span>Yeni Adres Ekle</span>
          <AddCircleOutlineIcon className='add-icon' />
        </div>
        <div className='place-order' onClick={handlePlaceOrder}>
          <span>Sipariş Ver</span>
          <BeenhereIcon className='add-icon' />
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
    </div>
  )
}

export default ProductOrder