import { createTheme } from "@mui/material";

export const customTheme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				"*": {
					boxSizing: "border-box",
				},
				"&::before": {
					boxSizing: "border-box",
				},
				"&::after": {
					boxSizing: "border-box",
				},
				html: {
					height: "100%",
				},
				body: {
					margin: "0",
					padding: "0",
					height: "100%",
				},
				a: {
					color: "blue",
					textDecoration: "none",
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#2e7d32 ",
		},
		secondary: {
			main: "#DEC19B",
		},
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: "sans-serif",
		fontSize: 12,
	},
  
});
