import { createTheme } from "@mui/material";

export const customTheme = createTheme({
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
