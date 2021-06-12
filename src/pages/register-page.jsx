import React from 'react';

// npm packets
import * as Yup from 'yup';
import cls from 'classnames';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

// handmade packets
import { registration } from '@redux/auth-reducer';
import { selectIsAuth } from 'src/selectors/auth-selector';

import logo from '@assets/logo.svg';


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимальная длина 2 символов')
    .max(100, 'Максимальная длина 100 символов')
    .required('Поле, обязательное для заполнения'),

  email: Yup.string()
    .email('Неправильный электронный адрес')
    .required('Поле, обязательное для заполнения'),

  password1: Yup.string()
    .min(8, 'Минимальная длина 8 символов')
    .max(100, 'Максимальная длина 100 символов')
    .required('Поле, обязательное для заполнения'),

  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null], 'Пароли не совпадают')
})


const Register = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = (data, actions) => {
    dispatch(registration(data.username, data.email, data.password1, data.password2, actions));
  }

  if (isAuth) {
    return <Redirect to = '/' />
  }

  return (
    <div className='auth'>
      <div className='auth__first-content'>
        <img className='auth__logo' src={logo} alt='' />
      </div>

      <div className='auth__second-content'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password1: '',
            password2: '',

          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>

          {({ isSubmitting, errors, touched }) => (
            <Form className='form'>
              <div className='form__title'> Создать аккаунт </div>

              <div className='form__group'>
                <label className='input__label' htmlFor='username'> Имя </label>
                <Field
                  id='username'
                  name='username'
                  className={cls('input', { 'input--error': errors.username && touched.username })}
                  placeholder='Введите свое имя'
                />
                {errors.username && touched.username && (<div className='auth__error'> { errors.username} </div>)}
              </div>

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
                <label className='input__label' htmlFor='password1'> Пароль </label>
                <Field
                  id='password1'
                  name='password1'
                  type='password'
                  className={cls('input', { 'input--error': errors.password1 && touched.password1 })}
                  placeholder='Введите свой пароль'
                />
                {errors.password1 && touched.password1 && (<div className='auth__error'> { errors.password1} </div>)}
              </div>

              <div className='form__group'>
                <label className='input__label' htmlFor='password2'> Повторить пароль </label>
                <Field
                  id='password2'
                  name='password2'
                  type='password'
                  className={cls('input', { 'input--error': errors.password2 && touched.password2 })}
                  placeholder='Введите свой пароль'
                />
                {errors.password2 && touched.password2 && (<div className='auth__error'> { errors.password2} </div>)}
              </div>

              <div className='auth__footer'>
                <button type='submit' className='button button__submit' disabled={isSubmitting}> {isSubmitting ? 'Загрузка...': 'Создать'} </button>
                <div className='form__link'> Уже есть аккаунт? <NavLink to='/login' className='form__link--blue'>Log in</NavLink> </div>
              </div>

            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}

export default Register;