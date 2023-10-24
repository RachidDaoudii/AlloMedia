import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setlogin } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  const [formValue, setForm] = useState(initialState);
  const { email, password } = formValue;
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      loginUser(formValue);
    } else {
      toast.error("Please enter Email and password");
    }
  };

  React.useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setlogin(loginData));
      if (loginData.data.verified) return navigate("/dashboard");
    }
  }, [isLoginSuccess]);

  React.useEffect(() => {
    if (isLoginError) {
      toast.error(`${loginError.data.message}`);
    }
  }, [isLoginError]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgetpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
