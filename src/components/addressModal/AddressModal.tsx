import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { IAddress } from '../../modals/IAddress';
import './AddressModal.scss';
import { v4 as uuidv4 } from 'uuid';


const provinces = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın',
    'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı',
    'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep',
    'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars',
    'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
    'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun',
    'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van',
    'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın',
    'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];
const commonDistricts = [
    'Merkez', 'Osmangazi', 'Yıldırım', 'Kepez', 'Melikgazi', 'Seyhan', 'Karatay', 'Etimesgut', 'Mamak', 'Çankaya'
];

const commonNeighbourhoods = [
    'Yeni', 'Cumhuriyet', 'Atatürk', 'Yavuz Selim', 'Zafer', 'Hürriyet', 'İnönü', 'Merkez', 'Yeşil', 'Sanayi'
];

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (address: IAddress) => void;
    editingAddress: IAddress | null;
    setEditingAddress: React.Dispatch<React.SetStateAction<IAddress | null>> ;
    onUpdate: (address: IAddress) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onAdd, editingAddress, setEditingAddress, onUpdate }) => {

    
    const formik = useFormik({
        initialValues: {
            addressName: editingAddress ? editingAddress.addressName : '',
            name: editingAddress ? editingAddress.name : '',
            lastname: editingAddress ? editingAddress.lastname : '',
            phoneNumber: editingAddress ? editingAddress.phoneNumber : '',
            province: editingAddress ? editingAddress.province : '',
            district: editingAddress ? editingAddress.district : '',
            neighbourhood: editingAddress ? editingAddress.neighbourhood : '',
            postcode: editingAddress ? editingAddress.postcode : '',
            addressLine: editingAddress ? editingAddress.addressLine : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            addressName: Yup.string().required('Adres Adı zorunludur'),
            name: Yup.string().required('İsim zorunludur'),
            lastname: Yup.string().required('Soyisim zorunludur'),
            phoneNumber: Yup.string().required('Telefon Numarası zorunludur'),
            province: Yup.string().required('İl zorunludur'),
            district: Yup.string().required('İlçe zorunludur'),
            neighbourhood: Yup.string().required('Mahalle zorunludur'),
            postcode: Yup.string().required('Posta Kodu zorunludur'),
            addressLine: Yup.string().required('Adres Satırı zorunludur')
        }),
        onSubmit: values => {
            const addressId = editingAddress ? editingAddress.addressId : uuidv4();
            const addressData = {...values, addressId};

            if (editingAddress) {
                onUpdate(addressData);
            }else{
                onAdd(addressData);
            }
        }
    });

    useEffect(() => {
        if (!editingAddress) {
            formik.resetForm();
        }
    }, [editingAddress]);

    const formatPhoneNumber = (value: string) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }

        return value;
    }

    if (isOpen === true) {

        return (
            <>
                <div className='overlay-2'></div>
                <div className={`modal ${isOpen ? '' : 'hidden'}`}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-div'>
                            <div className='form-inputs'>
                                <input
                                    type="text"
                                    placeholder='Adres Başlığı *'
                                    name='addressName'
                                    id='addressName'
                                    onChange={formik.handleChange}
                                    value={formik.values.addressName}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.addressName && formik.touched.addressName ? (<div className='error-container'><span className='error-div'>{formik.errors.addressName}</span></div>) : (<div className='default-div'></div>)}
                                <div className='names-container'>
                                    <div className='name-div'>
                                        <input type="text"
                                            placeholder='İsim *'
                                            name='name'
                                            id='name'
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.name && formik.touched.name ? (<div className='error-container'><span className='error-div'>{formik.errors.name}</span></div>) : (<div className='default-div'></div>)}

                                    </div>
                                    <div className='lastname-div'>

                                        <input type="text"
                                            placeholder='Soysim *'
                                            name='lastname'
                                            id='lastname'
                                            onChange={formik.handleChange}
                                            value={formik.values.lastname}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.lastname && formik.touched.lastname ? (<div className='error-container'><span className='error-div'>{formik.errors.lastname}</span></div>) : (<div className='default-div'></div>)}

                                    </div>

                                </div>


                                <input type="text"
                                    placeholder='Telefon Numarası *'
                                    name='phoneNumber'
                                    id='phoneNumber'
                                    onChange={e => {
                                        e.target.value = e.target.value.replace(/\D/g, '');
                                        formik.handleChange(e);
                                    }}
                                    value={formatPhoneNumber(formik.values.phoneNumber)}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.phoneNumber && formik.touched.phoneNumber ? (<div className='error-container'><span className='error-div'>{formik.errors.phoneNumber}</span></div>) : (<div className='default-div'></div>)}

                                <select name="province" id="province" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.province}>
                                    <option value="" label="İl seçin" />
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province} label={province} />
                                    ))}
                                </select>
                                {formik.errors.province && formik.touched.province ? (<div className='error-container'><span className='error-div'>{formik.errors.province}</span></div>) : (<div className='default-div'></div>)}


                                <select name="district" id="district" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.district}>
                                    <option value="" label="İlçe seçin" />
                                    {commonDistricts.map((district, index) => (
                                        <option key={index} value={district} label={district} />
                                    ))}
                                </select>
                                {formik.errors.district && formik.touched.district ? (<div className='error-container'><span className='error-div'>{formik.errors.district}</span></div>) : (<div className='default-div'></div>)}

                                <select name="neighbourhood" id="neighbourhood" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.neighbourhood}>
                                    <option value="" label="Mahalle seçin" />
                                    {commonNeighbourhoods.map((neighbourhood, index) => (
                                        <option key={index} value={neighbourhood} label={neighbourhood} />
                                    ))}
                                </select>
                                {formik.errors.neighbourhood && formik.touched.neighbourhood ? (<div className='error-container'><span className='error-div'>{formik.errors.neighbourhood}</span></div>) : (<div className='default-div'></div>)}
                                <input type="number"
                                    placeholder='Posta Kodu *'
                                    name='postcode'
                                    id='postcode'
                                    onChange={formik.handleChange}
                                    value={formik.values.postcode}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.postcode && formik.touched.postcode ? (<div className='error-container'><span className='error-div'>{formik.errors.postcode}</span></div>) : (<div className='default-div'></div>)}
                                <input type="text"
                                    placeholder='Adres Satırı *'
                                    name='addressLine'
                                    id='addressLine'
                                    onChange={formik.handleChange}
                                    value={formik.values.addressLine}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.addressLine && formik.touched.addressLine ? (<div className='error-container'><span className='error-div'>{formik.errors.addressLine}</span></div>) : (<div className='default-div'></div>)}

                                <div className='buttons'>
                                    <button type="button" onClick={() => {onClose(); setEditingAddress(null)}}>İptal Et</button>
                                    {editingAddress ? <button type="submit">Kaydet</button> : <button type="submit">Ekle</button>}
                                    
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    } else {
        return null;
    }

}

export default AddressModal