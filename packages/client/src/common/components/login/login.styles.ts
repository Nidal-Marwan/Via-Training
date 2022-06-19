import makeStyles from "@mui/material/styles/makeStyles";

export const loginFormStyles = makeStyles(() => ({
  emailInputField: { width: "300px" },
  passwordInputField: { width: "300px" },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
      boxShadow: "0 1px 8px 0 rgba(0,148,141,0.23)",
    },
  },

  submit: { width: "20px" },
}));
