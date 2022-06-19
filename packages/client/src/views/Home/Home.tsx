import Container from "@mui/material/Container";
import Login from "../../common/components/login/login";
import { SignUp } from "../../common/components/SignUp/SignUp";

export const Home: React.FC = () => {
  return (
    <Container sx={{ position: "relative" }}>
      <Login />
    </Container>
  );
};