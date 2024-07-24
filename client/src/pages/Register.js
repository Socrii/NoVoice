import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changesa
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
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
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type="text"
          fullWidth
          required
        />
        <TextField
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          name="email"
          margin="normal"
          type="email"
          fullWidth
          required
        />
        <TextField
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          name="password"
          margin="normal"
          type="password"
          fullWidth
          required
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
          onClick={() => navigate("/login")}
          fullWidth
          sx={{ borderRadius: 3, mt: 1 }}
        >
          Already Registered? Please Login
        </Button>
      </form>
    </Box>
  );
};

export default Register;
