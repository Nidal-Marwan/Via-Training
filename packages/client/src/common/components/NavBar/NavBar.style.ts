import { Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";

export const StyledToolBar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between",
});

export const StyledBox = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	"& li": {
		height:"50%",
		borderLeft: "1px solid rgba(0,0,0,0.12)"
	},
	"& a": {
		color: theme.palette.secondary.contrastText,
		fontWeight: 400,
		fontSize: 18,
	},
	"& img": {
		width: 64,
		height: 64,
	},
}));

export const StyledActionsBox = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	"& button": {
		marginLeft: 15,
	}
});
