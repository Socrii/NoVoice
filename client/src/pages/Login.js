import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={5}
      padding={3}
      borderRadius={2}
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
    >
      <Typography
        variant="h4"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        padding={2}
        textAlign="center"
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          placeholder="Email"
          value={inputs.email}
          name="email"
          margin="normal"
          type="email"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          placeholder="Password"
          value={inputs.password}
          name="password"
          margin="normal"
          type="password"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 3, mt: 2 }}
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/register")}
          fullWidth
          sx={{ borderRadius: 3, mt: 1 }}
        >
          Not a user? Please Register
        </Button>
      </form>
    </Box>
  );
};

export default Login;
