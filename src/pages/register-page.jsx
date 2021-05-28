import React from 'react';
import * as Yup from 'yup';
import cls from 'classnames';
import { Field, Form, Formik } from 'formik';

import logo from '@assets/logo.svg';
import { NavLink } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string()
  .min(3, 'Минимальная длина 2 символов')
  .max(100, 'Максимальная длина 100 символов')
  .required('Поле, обязательное для заполнения'),

  email: Yup.string()
    .email('Неправильный электронный адрес')
    .required('Поле, обязательное для заполнения'),

  password: Yup.string()
    .min(3, 'Минимальная длина 2 символов')
    .max(100, 'Максимальная длина 100 символов')
    .required('Поле, обязательное для заполнения')
})



const Register = () => {

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className = 'auth'>
      <div className='auth__first-content'>
        <img className='auth__logo' src={logo} alt='' />
      </div>

      <div className='auth__second-content'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit = { onSubmit }
          validationSchema = { validationSchema }>

          {({ isSubmitting, errors, touched }) => (
            <Form className = 'form'>
              <div className='form__title'> Создать аккаунт </div>

              <div className = 'form__group'>
                <label className = 'input__label' htmlFor = 'email'> Имя </label>
                <Field
                  id = 'email'
                  name='username'
                  className={cls('input', { 'input--error': errors.username && touched.username})}
                  placeholder = 'Введите свое имя'
                />
                {errors.username && touched.username && (<div className = 'auth__error'> { errors.username } </div>)}
              </div>

              <div className = 'form__group'>
                <label className = 'input__label' htmlFor = 'email'> E-mail </label>
                <Field
                  id = 'email'
                  name='email'
                  className={cls('input', { 'input--error': errors.email && touched.email})}
                  placeholder = 'Введите свой email'
                />
                {errors.email && touched.email && (<div className = 'auth__error'> { errors.email } </div>)}
              </div>

              <div className = 'form__group'>
                <label className = 'input__label' htmlFor = 'email'> Пароль </label>
                <Field
                  id = 'email'
                  name='password'
                  className={cls('input', { 'input--error': errors.password && touched.password})}
                  placeholder = 'Введите свой пароль'
                />
                {errors.password && touched.password && (<div className = 'auth__error'> { errors.password } </div>)}
              </div>

              <div className = 'auth__footer'>
                <button type = 'submit' className='button button__submit' disabled = { isSubmitting }> Создать </button>
                <div className = 'form__link'> Уже есть аккаунт? <NavLink to = '/login' className = 'form__link--blue'>Log in</NavLink> </div>
              </div>

            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}

export default Register;