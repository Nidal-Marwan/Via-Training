import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ModalBox = styled(Box)({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	backgroundColor: "#fff",
	boder: "2px solid #000",
	boxShadow: "24",
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: "2px",
});
export const ActionsBox = styled(Box)({
	marginTop: 30,
	display: "flex",
	justifyContent: "flex-end",
	gap: "10px",
	"& > *": {
		flexBasis: 100,
	},
});