import { TextInput } from "../TextInput/TextInput";
import { Form, Formik } from "formik";
import { trainingClient } from "../../api/trainingClient";
import { SignupSchema } from "./SignUp.schema";
import "./SignUp.css";
import { useState } from "react";
import { Button } from "../Button/Button";

interface SignUpResponse {
  status: number;
  message: string;
}

export const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>();
  const handleSubmit = async (values: any) => {
    setError(null);
    const response = await trainingClient.post<SignUpResponse>(
      "signup",
      values
    );
    if (response.data.status === 201) {
      //navigate to login
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
      <Form>
        <div className="form-container">
          <div>
            <TextInput
              name="name"
              type="text"
              id="outlined-basic"
              label="Name.."
            />
          </div>
          <div>
            <TextInput
              name="email"
              type="email"
              id="outlined-basic"
              label="Email.."
            />
            {error?.includes("Email") && <p className="error">{error}</p>}
          </div>
          <div>
            <TextInput
              name="phone"
              type="number"
              id="outlined-basic"
              label="Phone.."
            />
            {error?.includes("Phone") && <p className="error">{error}</p>}
          </div>
          <div>
            <TextInput
              name="password"
              type="password"
              id="outlined-basic"
              label="Password.."
            />
          </div>
          <div>
            <Button
              radius="20%"
              border="1px solid"
              width="100px"
              padding="15px"
              color="tomato"
              title="SignUp"
              type="submit"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};
