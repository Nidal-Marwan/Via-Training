import { Box, styled } from "@mui/material";
import { Form } from "formik";

export const ModalBox = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignItems: "center",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	height: 600,
	backgroundColor: "#fff",
	boder: "2px solid #000",
	boxShadow: "24",
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: "2px",
});

export const ActionsBox = styled(Box)({
	marginTop: 20,
	display: "flex",
	justifyContent: "center",
	gap: "10px",
	"& > *": {
		flexBasis: 100,
	},
});

export const StyledForm = styled(Form)(({ theme }) => ({
	paddingRight: 30,
	paddingLeft: 30,
	display: "flex",
	flexDirection: "column",
	width: 300,
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