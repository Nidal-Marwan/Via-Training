import { styled } from '@mui/system';
import { Form } from 'formik';

export const StyledForm = styled(Form)(({ theme }) => ({
	padding: 30,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: 5,
	marginTop: 20,
	display: 'flex',
	flexDirection: 'column',
	width: 400,
	gap: 25,
	'& .MuiButton-root': {
		width: 80,
	},
	'& .MuiTypography-root': {
		'& a': {
			textDecoration: 'none',
			color: theme.palette.primary.main,
		},
	},
}));
