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
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/authApi";
import { toast } from "react-toastify";

export default function SignUp() {
  const initialState = {
    username: "",
    email: "",
    role: "",
    password: "",
    repeat_password: "",
  };

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const navigate = useNavigate();

  const [formValue, setForm] = useState(initialState);
  const { username, email, role, password, repeat_password } = formValue;

  const handleChange = (event) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && email && role && password && repeat_password) {
      if (password === repeat_password) {
        registerUser(formValue);
      } else {
        toast.error("Password and Repeat Password should be same");
      }
    } else {
      toast.error("Please enter all the fields");
    }
  };

  React.useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Register successfully please verify your email");
      navigate("/login");
    }
  });

  React.useEffect(() => {
    if (isRegisterError) {
      toast.error(`${registerError.data.message}`);
    }
  }, [isRegisterError]);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="username"
                autoFocus
                onChange={handleChange}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <Radio
                checked={role === "client"}
                onChange={handleChange}
                value="client"
                name="role"
                inputProps={{ "aria-label": "client" }}
              />
              Client
              <Radio
                checked={role === "livreur"}
                onChange={handleChange}
                value="livreur"
                name="role"
                inputProps={{ "aria-label": "livreur" }}
              />
              Livreur
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeat_password"
                label="repeat password"
                type="password"
                id="repeat_password"
                autoComplete="repeat_password"
                onChange={handleChange}
                value={repeat_password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
