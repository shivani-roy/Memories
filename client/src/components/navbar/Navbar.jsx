import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import memoriesLogo from "../../assets/memoriesLogo.png";
import memoriesText from "../../assets/memoriesText.png";
import useStyles from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slice/auth/authSlice";
// import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setUser(null);
    dispatch(logoutUser(navigate));
    console.log(user);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    // if (token) {
    //   const decodedToken = jwtDecode(token);
    //   console.log(decodedToken, "h");
    //   const expirationTime = decodedToken.exp * 1000;
    //   const currentTime = Date.now();
    //   const timeUntilExpiration = expirationTime - currentTime;

    //   if (timeUntilExpiration > 0) {
    //     setUser(decodedToken);
    //     setTimeout(() => {
    //       logout();
    //     }, timeUntilExpiration);
    //   } else {
    //     logout();
    //   }
    // }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={useStyles.appBar}
    >
      <Link
        to="/"
        style={useStyles.brandContainer}
      >
        <img
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <img
          src={memoriesLogo}
          alt="memories"
          height="40px"
          style={useStyles.image}
        />
      </Link>

      <Toolbar sx={useStyles.toolbar}>
        {user ? (
          <Box sx={useStyles.profile}>
            <Avatar
              sx={useStyles.purple}
              alt={user?.data?.name}
              src={user?.data?.picture}
            >
              {user?.data?.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              sx={useStyles.userName}
              variant="h6"
            >
              {user?.data?.name}
            </Typography>

            <Button
              variant="contained"
              sx={{ background: "#e74179" }}
              onClick={logout}
            >
              logout
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
