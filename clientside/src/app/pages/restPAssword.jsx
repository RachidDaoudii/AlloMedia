import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRestPasswordMutation } from "../services/auth/authApi";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function RestPassword() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  const initialState = {
    password: "",
    repeat_password: "",
    token: token,
  };

  const [
    restPassword,
    {
      data: restPasswordData,
      isSuccess: isRestPasswordSuccess,
      isError: isRestPasswordError,
      error: restPasswordError,
    },
  ] = useRestPasswordMutation();

  const [formValue, setForm] = useState(initialState);
  const { password, repeat_password } = formValue;

  const handleChange = (event) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password && repeat_password) {
      restPassword(formValue);
    } else {
      toast.error("Please enter Password and repeat_password");
    }
  };

  useEffect(() => {
    if (isRestPasswordSuccess) {
      toast.success("Password Rest Successfully");
    }
    if (isRestPasswordError) {
      toast.error(restPasswordError.data.message);
    }
  }, [isRestPasswordSuccess, isRestPasswordError]);
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
          Rest Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            onChange={handleChange}
            value={password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeat_password"
            label="repeat_password"
            type="password"
            id="repeat_password"
            autoComplete="repeat_password"
            onChange={handleChange}
            value={repeat_password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Rest Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
