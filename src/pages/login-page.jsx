import React from 'react';
import * as Yup from 'yup';
import cls from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import logo from '@assets/logo.svg';
import { login } from '@redux/auth-reducer';



export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неправильный электронный адрес')
    .required('Поле, обязательное для заполнения'),
  password1: Yup.string()
    .min(3, 'Минимальная длина 2 символов')
    .max(100, 'Максимальная длина 100 символов')
    .required('Поле, обязательное для заполнения'),
});



const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  if (isAuth) {
    return <Redirect to='/' />
  }

  const onSubmit = (data, actions) => {
    console.log(data);
    dispatch(login(data.email, data.password1, actions));
  }

  return (
    <div className='auth'>
      <div className='auth__first-content'>
        <img className='auth__logo' src={logo} alt='' />
      </div>

      <div className='auth__second-content'>
        <Formik
          initialValues={{
            email: '',
            password1: '',
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>

          {({ isSubmitting, errors, touched }) => (
            <Form className='form'>


              <div className='form__title'> Войти </div>

              { errors.global_error && <div className='auth__error'> {errors.global_error} </div>}
              <div className='form__group'>
                <label className='input__label' htmlFor='email'> E-mail </label>
                <Field
                  id='email'
                  name='email'
                  className={cls('input', { 'input--error': errors.email && touched.email })}
                  placeholder='Введите свой email'
                />
                {errors.email && touched.email && (<div className='auth__error'> { errors.email} </div>)}
              </div>


              <div className='form__group'>
                <label className='input__label' htmlFor='password'> Пароль </label>
                <Field
                  id='password'
                  name='password1'
                  type='password'
                  className={cls('input', { 'input--error': errors.password1 && touched.password1 })}
                  placeholder='Введите свой пароль'
                />
                {errors.password1 && touched.password1 && (<div className='auth__error'> { errors.password1} </div>)}
              </div>

              <div className='auth__footer'>
                <button type='submit' className='button button__submit' disabled={isSubmitting}> {isSubmitting ? 'Загрузка...' : 'Войти'} </button>
                <div className='form__link'> Нет аккаунта? <NavLink to='/register' className='form__link--blue'>Sign up</NavLink> </div>
              </div>
            </Form>
          )
          }
        </Formik>


      </div>
    </div>
  )
}

export default Login;
