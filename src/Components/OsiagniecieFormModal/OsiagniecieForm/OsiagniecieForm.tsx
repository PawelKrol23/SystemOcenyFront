import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const OsiagniecieForm = () => {
  const [formData, setFormData] = useState({
    nazwa: '',
    iloscPunktow: 0,
    podkategoria: '',
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
        label="Nazwa"
        name="nazwa"
        value={formData.nazwa}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <TextField
        fullWidth
        label="Ilość Punktów"
        name="iloscPunktow"
        type={"number"}
        value={formData.iloscPunktow}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <TextField
        fullWidth
        label="Podkategoria"
        name="podkategoria"
        value={formData.podkategoria}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        color={"info"}
      />
      <Button type="submit" variant="contained" color="success" fullWidth>
        Submit
      </Button>
    </form>
  );
};
