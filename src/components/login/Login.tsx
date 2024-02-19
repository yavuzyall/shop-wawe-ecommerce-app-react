import React from 'react';
import './Login.scss';
import { isString, useFormik } from 'formik';
import * as Yup from 'yup';
import { getUsersByMail, isUserCredentialsValid } from '../../services/userService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userMail: '',
            userPassword: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            userMail: Yup.string().required("Lütfen mail adresinizi giriniz").email("Lütfen geçerli bir mail adresi giriniz"),
            userPassword: Yup.string().required("Lütfen şifrenizi giriniz").min(6, "Şifreniz en az 6 karakter olmalıdır")
        }),
        onSubmit: async values => {
            try {
                const userControl = await isUserCredentialsValid(values.userMail, values.userPassword);
                // console.log(userControl);
                // console.log(values.userMail, values.userPassword);
                // console.log(isString(values.userMail));
                // console.log(isString(values.userPassword));
                if (userControl) {
                    const userData = await getUsersByMail(values.userMail);
                    localStorage.setItem('user', JSON.stringify(userData.id));
                    navigate('/homepage');
                }else{
                    formik.setStatus("Yanlış email veya şifre.")
                }
            } catch (error) {
                console.error("Bir hata oluştu.", error);
            }
        }
    })

    return (
        <div className='login-container'>
            <h2 className='login-text'>Giriş Yap</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-div'>
                    <div className='form-inputs'>
                        <input
                            type="email"
                            placeholder='Mail Adresi'
                            name='userMail'
                            id='userMail'
                            onChange={formik.handleChange}
                            value={formik.values.userMail}
                            onBlur={formik.handleBlur} />
                        {formik.errors.userMail && formik.touched.userMail ? (<div className='error-container'><span className='error-div'>{formik.errors.userMail}</span></div>) : (<div className='default-div'></div>)}
                        <input
                            type="password"
                            placeholder='Şifre'
                            name='userPassword'
                            onChange={formik.handleChange}
                            value={formik.values.userPassword}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.userPassword && formik.touched.userPassword ? (<div className='error-container'><span className='error-div'>{formik.errors.userPassword}</span></div>) : formik.status ? (<div className='error-container-2' style={{ textAlign: 'center' }}><span className='error-div-2'>{formik.status}</span></div>) : (<div className='default-div'></div>)}
                        {/* {formik.status && <div className='error-container' style={{ textAlign: 'center' }}><span className='error-div'>{formik.status}</span></div>} */}
                        <Link to='/register'><div className='be-register'>Kayıt Ol</div></Link>
                        <button type='submit'>Giriş Yap</button>
                    </div>
                    <div className='form-bottom'>
                        <div>
                            <input type="checkbox" name='rememberMe' id='rememberMe' onChange={formik.handleChange} checked={formik.values.rememberMe} />
                            <label htmlFor="rememberMe">Beni Hatırla</label>
                        </div>
                        <div>
                            <a href=""><p>Şifremi Unuttum</p></a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login