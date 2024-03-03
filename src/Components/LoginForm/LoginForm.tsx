import React from "react";
import { TextField, Button } from "@mui/material";
import { CustomLoginForm } from "./LoginForm.styles";

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <CustomLoginForm>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Nazwa użytkownika"
          type="text"
          required={true}
          name="username"
          variant="outlined"
          margin="normal"
          color="secondary"
          
        />
        <TextField
          label="Hasło"
          required={true}
          type="password"
          name="password"
          variant="outlined"
          margin="normal"
          color="secondary"

        />
        <Button variant="contained" color="secondary" type="submit">
          Zaloguj się
        </Button>
      </form>
    </CustomLoginForm>
  );
};
