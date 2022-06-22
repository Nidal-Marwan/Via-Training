import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Form } from 'formik';

export const StyledForm = styled(Form)(({theme})=>({
	padding: 25,
	display: 'flex',
	flexDirection: 'column',
	width: 300,
	gap: 25,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: 5,
	'& .MuiFormHelperText-root': {
		marginTop: 0,
		height: 0,
	},
	'& .MuiButton-root': {
		width: 80,
	},
}));

export const StyledBox = styled(Box)(({theme})=>({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
	height: '80vh',

}));

export const Title = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	color: theme.palette.primary.main,
}));
