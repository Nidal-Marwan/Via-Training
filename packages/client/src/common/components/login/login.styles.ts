import { styled } from '@mui/system';
import { Form } from 'formik';

export const StyledForm = styled(Form)(({ theme }) => ({
	marginTop: 20,
	display: 'flex',
	flexDirection: 'column',
	width: 300,
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
