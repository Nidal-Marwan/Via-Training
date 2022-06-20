import { TextInput } from "../TextInput/TextInput";
import { Form, Formik } from "formik";
import { trainingClient } from "../../api/trainingClient";
import { SignupSchema } from "./SignUp.schema";
import { useState } from "react";
import { CustomButton } from "../Button/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

interface SignUpResponse {
  status: number;
  message: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>();
  const handleSubmit = async (values: any) => {
    setError(null);
    const response = await trainingClient.post<SignUpResponse>(
      "/home/signup",
      values
    );
    if (response.data.status === 201) {
      navigate("/");
    } else {
      setError(response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Container
        sx={{
          position: "absolute",
        }}
      >
        <Form>
          <Box>
            <TextInput
              name="name"
              type="text"
              id="outlined-basic"
              label={t("form.name")}
            />
          </Box>
          <Box>
            <TextInput
              name="email"
              type="email"
              id="outlined-basic"
              label={t("form.email")}
            />
            {error?.includes("Email") && <p className="error">{error}</p>}
          </Box>
          <Box>
            <TextInput
              name="phone"
              type="number"
              id="outlined-basic"
              label={t("form.phone")}
            />
            {error?.includes("Phone") && <p>{error}</p>}
          </Box>
          <Box>
            <TextInput
              name="password"
              type="password"
              id="outlined-basic"
              label={t("form.password")}
            />
          </Box>
          <Box>
            <CustomButton
              color="primary"
              title={t("form.signup")}
              type="submit"
            />
          </Box>
        </Form>
      </Container>
    </Formik>
  );
};
