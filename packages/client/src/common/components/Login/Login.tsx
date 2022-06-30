import { Formik } from "formik";
import { TextInput } from "../TextInput/TextInput";
import { useTranslation } from "react-i18next";
import { CustomButton } from "../Button/Button";
import { useState } from "react";
import { trainingClient } from "../../api/trainingClient";
import { StyledAlert, StyledBox, StyledForm } from "./Login.styles";
import { Link } from "react-router-dom";
import { CircularProgress, Stack, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import loginSchema from "./Login.schema";
import { ModalContainer } from "../ModalContainer/ModalContainer";

interface LoginResponse {
	status: number;
	message: string;
	token: string;
}

const Login = () => {
	const { t } = useTranslation();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>();

	const initialValues = {
		email: "",
		password: "",
	};
	const handleSubmit = async (values: any) => {
		const transformedValues = { ...values, email: values.email.toLowerCase() };
		setIsLoading(true);
		setError(null);
		const response = await trainingClient.post<LoginResponse>(
			"/home/login",
			transformedValues
		);
		if (response.data.status === 200) {
			window.localStorage.setItem("access_token", response.data.token);
			setIsLoading(false);
			setIsLoggedIn(true);

		} else {
			setIsLoading(false);
			setError(response.data.message);
		}
	};
	return (
		<>
			<Stack spacing={2} sx={{ position: "relative" }}>
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
							initialValues={initialValues}
							validationSchema={loginSchema}
							onSubmit={(values) => handleSubmit(values)}
							validateOnChange={false}
						>
							<StyledForm>
								<TextInput
									name='email'
									type='text'
									id='outlined-basic'
									label={t("form.email")}
								/>
								<TextInput
									name='password'
									type='password'
									id='outlined-basic'
									label={t("form.password")}
								/>
								<CustomButton
									color='primary'
									title={t("form.login")}
									type='submit'
								/>
								{/* will become a link when routes are created so we can route the user to signup page*/}
								<Typography variant='body1'>
									{t("form.registration.text")}{" "}
									<Link to='/signup'>{t("form.registration.link")}</Link>
								</Typography>
							</StyledForm>
						</Formik>
					)}
				</StyledBox>
			</Stack>
			{isLoggedIn && <ModalContainer page='login' />}
		</>
	);
};
export default Login;
