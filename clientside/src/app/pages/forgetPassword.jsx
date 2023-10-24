import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSendEmailForGetPAssworMutation } from "../services/authApi";

export default function ForGetPassword() {
  const initialState = {
    email: "",
  };

  const [formValue, setForm] = useState(initialState);

  const { email } = formValue;
  const handleChange = (event) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const [
    sendEmail,
    {
      data: emailData,
      isSuccess: isEmailSuccess,
      isError: isEmailError,
      error: emailError,
    },
  ] = useSendEmailForGetPAssworMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      sendEmail(formValue);
    } else {
      toast.error("Please enter Email");
    }
  };

  React.useEffect(() => {
    if (isEmailSuccess) {
      toast.success("please check your email");
    }
  }, [isEmailSuccess]);

  React.useEffect(() => {
    if (isEmailError) {
      toast.error(`${emailError.data.message}`);
    }
  }, [isEmailError]);

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
          Forget Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            forget password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Sign in
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
