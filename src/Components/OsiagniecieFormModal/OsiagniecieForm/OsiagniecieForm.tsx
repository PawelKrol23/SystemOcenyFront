import React, { useState } from 'react';
import { TextField, Button, InputLabel, FormControl, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import { useSOP } from "../../../Context/ContextProvider.tsx";
import { Podkategoria } from "../../../Interfaces/UserType.tsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

export interface OsiagniecieFormProps {
  afterSubmit: () => void
}

export const OsiagniecieForm = (props: OsiagniecieFormProps) => {
  const [formData, setFormData] = useState({
    nazwa: '',
    iloscPunktow: 0,
    podkategoria: '',
    data: new Date()
  });
  const [errorForm, setErrorForm] = useState({
    nazwa: false,
    iloscPunktow: false,
    podkategoria: false,
    data: false
  });
  const { getUserAllPodkategorias, getUserSession } = useSOP();
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
  
  const handleNazwaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nazwa: value,
    }));
    if(value.length < 1 || value.length > 250) {
      setErrorForm((prevData) => ({
        ...prevData,
        nazwa: true,
      }))
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        nazwa: false,
      }))
    }
  }
  
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSession = getUserSession();
    if(!userSession || !userSession.token) {
      alert(`User not logged in`);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/osiagniecie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userSession.token}`,
        },
        body: JSON.stringify({
          nazwa: formData.nazwa,
          iloscPunktow: formData.iloscPunktow,
          podKategoria: formData.podkategoria,
          data: formData.data.getTime(),
          zatwierdzone: false,
          pracownikDTOList: [
            {
              id: userSession.pracownik.id,
              imie: userSession.pracownik.imie,
              nazwisko: userSession.pracownik.nazwisko,
              email: userSession.pracownik.email,
              stopienNaukowy: userSession.pracownik.stopienNaukowy,
              stanowisko: userSession.pracownik.stanowisko,
              dataOstatniejOceny: null,
              grupa: userSession.pracownik.grupa,
            }
          ]
        }),
      });
      
      const data = await response.text();
      console.log(data)
      if (response.ok) {
        props.afterSubmit()
      } else {
        alert(`Error during submit: ${data}`);
      }
    } catch (error) {
      alert(`Error during submit: ${error}`);
    }
  };
  
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData((prevData) => ({
      ...prevData,
      podkategoria: event.target.value,
    }));
  };
  
  const handleDatePickerChange = (date: dayjs.Dayjs | null) => {
    console.log(date)
    if(date) {
      setFormData((prevState) => {
        return {
          ...prevState,
          data: date.toDate()
        }
      })
      console.log(formData.data)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Nazwa"
        name="nazwa"
        value={formData.nazwa}
        onChange={handleNazwaChange}
        margin="normal"
        variant="outlined"
        color={"info"}
        error={errorForm.nazwa}
        helperText={ errorForm.nazwa ? "Długość nazwy musi być z przedziału od 1 do 250 znaków" : ""}
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
            <MenuItem key={podkategoria.idPodKategorii} value={podkategoria.nazwa}>{podkategoria.nazwa}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          width: "100%"
        }}>
          <DatePicker onChange={handleDatePickerChange} value={dayjs(formData.data)}/>
        </div>
      </LocalizationProvider>
      <Button variant="contained" color="success" startIcon={<AddIcon />} type={"submit"} fullWidth
       style={{
         margin: "0.5rem auto",
         fontWeight: "bold"
       }}>
        Dodaj
      </Button>
    </form>
  );
};
