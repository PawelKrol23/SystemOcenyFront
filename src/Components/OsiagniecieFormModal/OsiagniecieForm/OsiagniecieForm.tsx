import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const OsiagniecieForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <TextField
        fullWidth
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
        color={"info"}
        style={{ marginBottom: 10 }}
      />
      <Button type="submit" variant="contained" color="success" fullWidth>
        Submit
      </Button>
    </form>
  );
};
