import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимальная длина 2 символов')
      .max(100, 'Максимальная длина 100 символов')
      .required('Поле, обязательное для заполнения'),
  
    email: Yup.string()
      .email('Неправильный электронный адрес')
      .required('Поле, обязательное для заполнения'),
  
    password1: Yup.string()
      .min(3, 'Минимальная длина 2 символов')
      .max(100, 'Максимальная длина 100 символов')
      .required('Поле, обязательное для заполнения'),
  
    password2: Yup.string()
      .min(3, 'Минимальная длина 2 символов')
      .max(100, 'Максимальная длина 100 символов')
      .required('Поле, обязательное для заполнения')
})