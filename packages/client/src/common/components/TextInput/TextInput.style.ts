import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const StyledTextField = styled(TextField)({
	"& .MuiFormHelperText-root": {
		marginTop: 0,
		height: 0,
	},
});
