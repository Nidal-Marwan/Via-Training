import { Alert, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Form } from "formik";

export const StyledForm = styled(Form)(({theme})=>({
	padding: 25,
	display: "flex",
	flexDirection: "column",
	width: 400,
	gap: 25,
	"& .MuiButton-root": {
		width: 80,
	},
	"& .MuiTypography-root": {
		"& a": {
			textDecoration: "none",
			color: theme.palette.primary.main,
		},
	},
}));

export const StyledBox = styled(Box)(({theme})=>({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 400,
	minHeight: 470,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: 5,
}));

export const Title = styled(Typography)(({ theme }) => ({
	textAlign: "center",
	color: theme.palette.primary.main,
}));

export const ContainerBox = styled(Box)({
	display:"flex",
	justifyContent: "center",
	alignItems: "center",
	height: "80vh",
});

export const StyledAlert = styled(Alert)({
	position: "absolute",
	top:"-50px",
	width: "100%",
});