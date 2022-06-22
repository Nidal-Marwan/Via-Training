import { Form, Formik, FormikProps } from "formik";
import { TextInput } from "../TextInput/TextInput";
import { Box, Container } from "@mui/material";
import { t } from "i18next";
import { CustomButton } from "../Button/Button";
import { useState } from "react";
import { trainingClient } from "../../api/trainingClient";
import { LoginSchema } from "./login.schema";
import { Link } from "react-router-dom";

interface LoginResponse {
  status: number;
  message: string;
  token: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values: any) => {
    setError(null);
    const response = await trainingClient.post<LoginResponse>(
      "/home/login",
      values
    );
    if (response.data.status === 201) {
      window.localStorage.setItem("access_token", response.data.token);
      //navigate to home
    } else {
      setError(response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({}: FormikProps<any>): React.ReactNode => {
        return (
          <Container
            sx={{
              width: "30%",
              border: "1px solid",
              borderRadius: "8%",
              padding: "6%",
            }}
          >
            <Form>
              <Box>
                <TextInput
                  name="email"
                  type="text"
                  id="outlined-basic"
                  label={t("form.email")}
                />
              </Box>
              <Box>
                <TextInput
                  name="password"
                  type="password"
                  id="outlined-basic"
                  label={t("form.password")}
                />
              </Box>
              <CustomButton
                color="primary"
                title={t("form.login")}
                type="submit"
              />
              {/* will become a link when routes are created so we can route the user to signup page*/}
              <Box>
                <p>
                  Not a member ? <Link to="/signup">Join Us</Link>
                </p>
              </Box>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
};
export default Login;
