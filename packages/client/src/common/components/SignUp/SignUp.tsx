import { TextInput } from '../TextInput/TextInput';
import { StyledBox, StyledForm, Title, ContainerBox, StyledAlert } from './SignUp.styles';
import { Formik } from 'formik';
import { trainingClient } from '../../api/trainingClient';
import { useState } from 'react';
import { CustomButton } from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import signupSchema from './SignUp.schema';
import { CircularProgress, IconButton, Stack,Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface SignUpResponse {
	status: number;
	message: string;
}

export const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [error, setError] = useState<string | null>();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		setIsLoading(true);
		setError(null);
		const response = await trainingClient.post<SignUpResponse>(
			'/home/signup',
			values
		);
		if (response.data.status === 201) {
			setIsLoading(false);
			navigate('/');
		} else {
			setIsLoading(false);
			setError(response.data.message);
		}
	};
	return (
		<ContainerBox>
			<Stack spacing={2} sx={{ position: 'relative' }}>
				{error && (
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
						{t(`${error}`)}
					</StyledAlert>
				)}
				<StyledBox>
					{isLoading ? <CircularProgress /> : (
						<Formik
							initialValues={{ name: '', email: '', phone: '', password: '' }}
							validationSchema={signupSchema}
							onSubmit={(values) => handleSubmit(values)}
						>
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
								<Typography variant='body1'>
									{t('form.signin.text')}{' '}
									<Link to='/'>{t('form.signin.link')}</Link>
								</Typography>
							</StyledForm>
						</Formik>
						
					)}
					
				</StyledBox>
			</Stack>
		</ContainerBox>
	);
};
