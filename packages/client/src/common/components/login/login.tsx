import { Formik, FormikProps } from 'formik';
import { TextInput } from '../TextInput/TextInput';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/Button';
import { useState } from 'react';
import { trainingClient } from '../../api/trainingClient';
import { StyledForm } from './Login.styles';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { ModalContainer } from '../ModalContainer/ModalContainer';

interface LoginResponse {
	status: number;
	message: string;
	token: string;
}

const Login = () => {
	const { t } = useTranslation();

	const [isloggedIn, setIsLoggedIn] = useState(false);

	const [error, setError] = useState<string | null>();

	const initialValues = {
		email: '',
		password: '',
	};
	const handleSubmit = async (values: any) => {
		setError(null);
		const response = await trainingClient.post<LoginResponse>(
			'/home/login',
			values
		);
		if (response.data.status === 200) {
			window.localStorage.setItem('access_token', response.data.token);
			setIsLoggedIn(true);
			//navigate to home
		} else {
			setError(response.data.message);
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object({
					email: Yup.string()
						.email(t('form.loginAlerts.email'))
						.required(t('form.loginAlerts.email')),
					password: Yup.string()
						.required(t('form.loginAlerts.password.required'))
						.min(8, t('form.loginAlerts.password.min')),
				})}
				onSubmit={handleSubmit}
				validateOnChange={false}
			>
				{({}: FormikProps<any>): React.ReactNode => {
					return (
						<StyledForm>
							<TextInput
								name='email'
								type='text'
								id='outlined-basic'
								label={t('form.email')}
							/>
							<TextInput
								name='password'
								type='password'
								id='outlined-basic'
								label={t('form.password')}
							/>
							<CustomButton
								color='primary'
								title={t('form.login')}
								type='submit'
							/>
							{/* will become a link when routes are created so we can route the user to signup page*/}
							<Typography variant='body1'>
								{t('form.registration.text')}{' '}
								<Link to='/signup'>{t('form.registration.link')}</Link>
							</Typography>
						</StyledForm>
					);
				}}
			</Formik>
			{isloggedIn && <ModalContainer />}
		</>
	);
};
export default Login;
