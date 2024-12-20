import { Container } from "@mui/material";
import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default HomeLayout;
