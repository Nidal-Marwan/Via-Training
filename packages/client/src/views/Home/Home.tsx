import Container from "@mui/material/Container";
import { SignUp } from "../../common/components/SignUp/SignUp";

export const Home: React.FC = () => {
  return (
    <Container sx={{ position: "relative" }}>
      <SignUp />
    </Container>
  );
};
