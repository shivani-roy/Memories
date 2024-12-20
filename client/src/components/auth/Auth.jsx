import {
  Paper,
  Avatar,
  Container,
  Grid2,
  Typography,
  Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { googleAuth, signIn, signUp } from "../../slice/auth/authSlice";
// import axios from "axios";
// import Icon from "./icon";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  // const [user, setUser] = useState(null);
  const { authData: user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp({ formData, navigate }));
    } else {
      dispatch(signIn({ formData, navigate }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  // const getUserData = async (user) => {
  //   try {
  //     const token = user?.access_token;
  //     const { data } = await axios.get(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     return { data, token };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleSuccess = async (res) => {
    try {
      console.log(res);
      const decodedData = jwtDecode(res.credential);
      // console.log(decoded);
      // const data = await getUserData(res.credential);
      console.log(decodedData);

      dispatch(googleAuth({ decodedData, token: res.credential, navigate }));
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was not Successfull");
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (res) => googleSuccess(res),
  //   // flow: "auth-code",
  //   onError: (error) => googleFailure(error),
  //   responseType: "id_token",
  // });

  // useEffect(() => {
  //   if (user) {
  //     getUserData(user);
  //   }
  // }, [user]);

  if (user) {
    return <Navigate to="/posts" />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Paper
        sx={useStyles.paper}
        elevation={3}
      >
        <Avatar sx={useStyles.avatar}>
          <LockOutlined />
        </Avatar>

        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

        <form
          style={useStyles.form}
          onSubmit={handleSubmit}
        >
          <Grid2
            container
            spacing={2}
          >
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showpassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid2>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={useStyles.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          {/* <Button
            sx={useStyles.googleButton}
            color="primary"
            fullWidth
            onClick={() => googleLogin()}
            startIcon={<Icon />}
            variant="contained"
          >
            Google Sign In
          </Button> */}

          <GoogleLogin
            style={useStyles.googleButton}
            theme="filled_blue"
            size="medium"
            onSuccess={(res) => googleSuccess(res)}
            onError={(error) => googleFailure(error)}
          />
          <Grid2
            container
            justifyContent="center"
          >
            <Grid2>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
