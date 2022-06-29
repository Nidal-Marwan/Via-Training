import { Box, Alert } from "@mui/material";
import { styled } from "@mui/system";
import { Form } from "formik";

export const StyledForm = styled(Form)(({ theme }) => ({
	padding: 30,
	display: "flex",
	flexDirection: "column",
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
export const StyledBox = styled(Box)(({ theme }) => ({
	padding: 30,
	width: 400,
	minHeight:355,
	display:"flex",
	flexDirection:"column",
	alignItems:"center",
	justifyContent:"center",
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius:5,
}));

export const StyledAlert = styled(Alert)({
	position: "absolute",
	top:"-50px",
	width: "100%",
});