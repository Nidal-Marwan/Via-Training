import * as Yup from 'yup';

const signupSchema = Yup.object({
  name: Yup.string().required('form.signupAlerts.name'),
  phone: Yup.number()
    .required('form.signupAlerts.phone.required')
    .min(10, 'form.signupAlerts.phone.min'),
  email: Yup.string()
    .email('form.signupAlerts.email.invalid')
    .required('form.signupAlerts.email.required'),
  password: Yup.string()
    .min(8, 'form.signupAlerts.password.min')
    .required('form.signupAlerts.password.required'),
});

export default signupSchema;