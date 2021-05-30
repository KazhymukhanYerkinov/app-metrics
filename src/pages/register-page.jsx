import React from 'react';
import cls from 'classnames';
import { Field, Form, Formik } from 'formik';

import logo from '@assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registration } from '@redux/auth-reducer';
import { validationSchema } from '@utils/validation';






const Register = () => {

  const dispatch = useDispatch();


  const onSubmit = (data, actions) => {
    dispatch(registration(data.username, data.email, data.password1, data.password2));
    actions.setSubmitting(false);
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
                <button type='submit' className='button button__submit' disabled={isSubmitting}> Создать </button>
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