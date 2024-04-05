import React, { useState } from 'react';
import { TextField, Button, InputLabel, FormControl, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import { useSOP } from "../../../Context/ContextProvider.tsx";
import { Podkategoria } from "../../../Interfaces/UserType.tsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const OsiagniecieForm = () => {
  const [formData, setFormData] = useState({
    nazwa: '',
    iloscPunktow: 0,
    podkategoria: '',
  });
  const { getUserAllPodkategorias } = useSOP();
  const [AllPodkategorias, setAllPodkategorias] = useState<Podkategoria[] | null>([]);
  
  const setPodkategorias = async () => {
    const podkategorias = await getUserAllPodkategorias();
    setAllPodkategorias(podkategorias);
  };
  
  React.useEffect(() => {
    setPodkategorias();
  }, []);
  
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
  
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      podkategoria: event.target.value,
    }));
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
      <FormControl fullWidth color={"info"} margin={"normal"}>
        <InputLabel id="demo-simple-select-label" color={"info"}>Podkategoria</InputLabel>
        <Select
          color={"info"}
          labelId="demo-simple-select-label"
          value={formData.podkategoria}
          label="Podkategoria"
          onChange={handleSelectChange}
        >
          {AllPodkategorias?.map((podkategoria) => (
            <MenuItem value={podkategoria.nazwa}>{podkategoria.nazwa}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      <Button type="submit" variant="contained" color="success" fullWidth>
        Submit
      </Button>
    </form>
  );
};
