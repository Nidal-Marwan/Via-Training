import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('form.loginAlerts.email.invalid')
    .required('form.loginAlerts.email.required'),
  password: Yup.string()
    .required('form.loginAlerts.password.required')
    .min(8, 'form.loginAlerts.password.min'),
});

export default loginSchema;