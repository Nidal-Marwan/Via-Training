import { Formik, FormikProps } from 'formik';
import { TextInput } from '../TextInput/TextInput';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../Button/Button';
import { useState } from 'react';
import { trainingClient } from '../../api/trainingClient';
import { StyledAlert, StyledBox, StyledForm } from './Login.styles';
import { Link } from 'react-router-dom';
import {Collapse, CircularProgress, Stack, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>();

	const initialValues = {
		email: '',
		password: '',
	};
	const handleSubmit = async (values: any) => {
		setIsLoading(true)
		setError(null);
		const response = await trainingClient.post<LoginResponse>(
			'/home/login',
			values
		);
		if (response.data.status === 200) {
			window.localStorage.setItem('access_token', response.data.token);
			setIsLoggedIn(true);
			setIsLoading(false);
			//navigate to home
		} else {
			setIsLoggedIn(false);
			setIsLoading(false);
			setError(response.data.message);
		}
	};
	return (
		<Stack spacing={2} sx={{position:'relative'}}>
		{error && (
			<Collapse in={error === null ? false: true}>
				<StyledAlert 
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setError(null);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				severity='error'>
					{error}
				</StyledAlert>
			</Collapse>
		)}
		<StyledBox>
			{isLoading ? <CircularProgress/> : (
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
			)}
						{isloggedIn && <ModalContainer />}
		</StyledBox>
		</Stack>
	);
};
export default Login;
