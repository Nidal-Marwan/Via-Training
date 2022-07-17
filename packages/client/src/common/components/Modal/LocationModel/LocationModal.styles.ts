import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ModalBox = styled(Box)({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width:"93%",
	height:"100%",
	backgroundColor: "#fff",
	boder: "2px solid #000",
	boxShadow: "24",
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: "2px",
});
export const ActionsBox = styled(Box)({
	
	display: "flex",
	justifyContent: "center",
	gap: "10px",
	"& > *": {
		flexBasis: 100,
	},
});
export const MapBox = styled(Box)({
	display:"flex",
	justifyContent:"space-around",
	alignItems:"center",
	flexDirection:"row",
	marginTop:"10px"

});
export const GridBox = styled(Box)({
	display: "grid", 
	gridTemplateColumns: "auto auto auto",
	paddingBottom: "20px"
});
export const GridItem = styled(Box)({
	border: "1px solid rgba(0, 0, 0, 0.2)",
	padding: "10px",
	fontSize: "30px",
	textAlign: "center"
});