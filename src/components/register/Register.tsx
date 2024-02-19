import React from 'react';
import './Register.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/shopwawe-logo.png';
import { v4 as uuidv4 } from 'uuid';
import { registerUser, checkUserExists } from '../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Register = () => {

    const navigate = useNavigate();

    const formatPhoneNumber = (value: string) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }

        return value;
    }

    const formik = useFormik({
        initialValues: {
            userMail: '',
            userFirstname: '',
            userLastname: '',
            userPassword: '',
            userConPassword: '',
            userPhone: '',
        },
        validationSchema: Yup.object({
            userMail: Yup.string().required("Lütfen bir mail adresi giriniz").email("Lütfen geçerli bir mail adres, giriniz"),
            userFirstname: Yup.string().required("Lütfen bir isim giriniz").min(3, "İsminiz minimum üç karakter olmalıdır."),
            userLastname: Yup.string().required("Lütfen bir soyisim giriniz").min(3, "Soyisminiz minimum üç karakter olmalıdır."),
            userPassword: Yup.string().required("Lütfen bir şifre giriniz").min(6, "Şifreniz minimum 6 karakter uzunluğunda olmalı.").matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
            ),
            userConPassword: Yup.string().required("Lütfen şifrenizi tekrar giriniz").oneOf([Yup.ref('userPassword'), ''], 'Şifreler eşleşmiyor'),
            userPhone: Yup.string().required("Lütfen bir telefon numarası giriniz").min(10, "Telefon numarası minimum 10 karakter olmalıdır").matches(/^[1-9]{1}[0-9]{9}$/, "Geçerli bir telefon numarası giriniz")
        }),
        onSubmit: async values => {
            try {

                const userExists = await checkUserExists(values.userMail, values.userPhone);
                if (userExists) {
                    toast.error('Bu mail adresi veya telefon numarası zaten kullanımda!', {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    const userWithId = {
                        ...values,
                        userId: uuidv4()
                    }
                    const data = await registerUser(userWithId);

                    if (data) {
                        toast.success('Kullanıcı kaydı başarıyla oluşturuldu!', {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        formik.resetForm();
                        navigate('/login');
                    }
                }


            } catch (error) {
                console.error("Veri kaydedilirken bir hata meydana geldi: ", error);
                if (error) {
                    toast.error('Kayıt oluşturulamadı.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            }
        }
    })

    return (
        <div className='container'>
            <div className='register-container'>
                <div className='logo-container'>
                    <div className='logo-border'>
                        <img src={Logo} alt="" className='logo-img' />
                    </div>
                </div>
                <h2 className='register-text'>Kayıt Ol</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-div'>
                        <div className='form-inputs'>
                            <input
                                type="email"
                                placeholder='Mail Adresi *'
                                name='userMail'
                                id='userMail'
                                onChange={formik.handleChange}
                                value={formik.values.userMail}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.userMail && formik.touched.userMail ? (<div className='error-container'><span className='error-div'>{formik.errors.userMail}</span></div>) : (<div className='default-div'></div>)}
                            <div className='names-container'>
                                <div className='firstname-div'>
                                    <input type="text"
                                        placeholder='İsim *'
                                        name='userFirstname'
                                        id='userFirstname'
                                        onChange={formik.handleChange}
                                        value={formik.values.userFirstname}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.userFirstname && formik.touched.userFirstname ? (<div className='error-container'><span className='error-div'>{formik.errors.userFirstname}</span></div>) : (<div className='default-div'></div>)}

                                </div>
                                <div className='lastname-div'>

                                    <input type="text"
                                        placeholder='Soysim *'
                                        name='userLastname'
                                        id='userLastname'
                                        onChange={formik.handleChange}
                                        value={formik.values.userLastname}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.userLastname && formik.touched.userLastname ? (<div className='error-container'><span className='error-div'>{formik.errors.userLastname}</span></div>) : (<div className='default-div'></div>)}

                                </div>

                            </div>


                            <input type="text"
                                placeholder='Telefon Numarası *'
                                name='userPhone'
                                id='userPhone'
                                onChange={e => {
                                    e.target.value = e.target.value.replace(/\D/g, ''); 
                                    formik.handleChange(e);
                                }}
                                value={formatPhoneNumber(formik.values.userPhone)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.userPhone && formik.touched.userPhone ? (<div className='error-container'><span className='error-div'>{formik.errors.userPhone}</span></div>) : (<div className='default-div'></div>)}

                            <input type="password"
                                placeholder='Şifre *'
                                name='userPassword'
                                id='userPassword'
                                onChange={formik.handleChange}
                                value={formik.values.userPassword}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.userPassword && formik.touched.userPassword ? (<div className='error-container'><span className='error-div'>{formik.errors.userPassword}</span></div>) : (<div className='default-div'></div>)}


                            <input type="password"
                                placeholder='Şifre Tekrarı *'
                                name='userConPassword'
                                id='userConPassword'
                                onChange={formik.handleChange}
                                value={formik.values.userConPassword}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.userConPassword && formik.touched.userConPassword ? (<div className='error-container'><span className='error-div'>{formik.errors.userConPassword}</span></div>) : (<div className='default-div'></div>)}

                            <button type='submit'>Kayıt</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register