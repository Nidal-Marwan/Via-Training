import { TextInput } from '../TextInput/TextInput';
import { StyledBox, StyledForm, Title } from './SignUp.styles';
import {  Formik } from 'formik';
import { trainingClient } from '../../api/trainingClient';
import { useState } from 'react';
import { CustomButton } from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


interface SignUpResponse {
	status: number;
	message: string;
}

export const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [error, setError] = useState<string | null>();
	const handleSubmit = async (values: any) => {
		setError(null);
		const response = await trainingClient.post<SignUpResponse>(
			'/home/signup',
			values
		);
		if (response.data.status === 201) {
			navigate('/');
		} else {
			setError(response.data.message);
		}
	};
	return (
		<Formik
			initialValues={{ name: '', email: '', phone: '', password: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required(t('form.signupAlerts.name')),
				phone: Yup.number()
					.required(t('form.signupAlerts.phone.required'))
					.min(10, t('form.signupAlerts.phone.min')),
				email: Yup.string()
					.email(t('form.signupAlerts.email.invalid'))
					.required(t('form.signupAlerts.email.required')),
				password: Yup.string()
					.min(8, t('form.signupAlerts.password.min'))
					.required(t('form.signupAlerts.password.required')),
			})}
			onSubmit={(values) => handleSubmit(values)}
		>
			<StyledBox>
				<StyledForm>
					<Title variant='h3'>Signup</Title>
					<TextInput
						name='name'
						type='text'
						id='outlined-basic'
						label={t('form.name')}
					/>
					<TextInput
						name='email'
						type='email'
						id='outlined-basic'
						label={t('form.email')}
					/>
					<TextInput
						name='phone'
						type='number'
						id='outlined-basic'
						label={t('form.phone')}
					/>
					<TextInput
						name='password'
						type='password'
						id='outlined-basic'
						label={t('form.password')}
					/>
					<CustomButton
						color='primary'
						title={t('form.signup')}
						type='submit'
					/>
				</StyledForm>
			</StyledBox>
		</Formik>
	);
};
