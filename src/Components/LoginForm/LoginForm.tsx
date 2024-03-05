import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useSOP } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { login, isLoggedIn } = useSOP(); // Dodaj isLoggedIn z kontekstu
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(credentials.username, credentials.password);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/UserPage');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Nazwa użytkownika"
        type="text"
        required={true}
        name="username"
        variant="outlined"
        margin="normal"
        color="secondary"
        value={credentials.username}
        onChange={handleChange}
      />
      <TextField
        label="Hasło"
        required={true}
        type="password"
        name="password"
        variant="outlined"
        margin="normal"
        color="secondary"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" type="submit">
        Zaloguj się
      </Button>
    </form>
  );
};
