import React, { useState } from 'react';
import { TextField, Button, InputLabel, FormControl, Select, SelectChangeEvent, FormHelperText } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import { useSOP } from "../../../Context/ContextProvider.tsx";
import { Podkategoria } from "../../../Interfaces/UserType.tsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";

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
  const [iloscPunktowHelperText, setIloscPunktowHelperText] = useState<string>('');
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  
  const setPodkategorias = async () => {
    const podkategorias = await getUserAllPodkategorias();
    setAllPodkategorias(podkategorias);
  };
  
  React.useEffect(() => {
    setPodkategorias();
  }, []);
  
  React.useEffect(() => {
    checkIloscPunktowValidity()
  }, [formData])
  
  React.useEffect(() => {
    setFormInvalid(errorForm.nazwa || errorForm.iloscPunktow || errorForm.data || errorForm.podkategoria);
  }, [errorForm])
  
  const checkIloscPunktowValidity = () => {
    if(formData.podkategoria === '') {
      return;
    }
    
    const podkategoria = AllPodkategorias?.find(el => {
      return el.nazwa === formData.podkategoria
    });
    
    if (!podkategoria) {
      return;
    }
    
    if(formData.iloscPunktow > podkategoria.maxPunktow || formData.iloscPunktow < podkategoria.minPunktow) {
      setErrorForm((prevData) => ({
        ...prevData,
        iloscPunktow: true,
      }));
      setIloscPunktowHelperText(`Ilość punktów powinna być z przedziału od ${podkategoria.minPunktow} do ${podkategoria.maxPunktow}`);
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        iloscPunktow: false,
      }));
      setIloscPunktowHelperText("");
    }
  }
  
  const handleIloscPunktowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      iloscPunktow: +value,
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
    if(formData.podkategoria === '') {
      setErrorForm((prevData) => ({
        ...prevData,
        podkategoria: true
      }))
      return
    }
    
    if(formData.nazwa.length < 1 || formData.nazwa.length > 250) {
      setErrorForm((prevData) => ({
        ...prevData,
        nazwa: true
      }))
      return
    }
    
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
    const value = event.target.value
    setFormData((prevData) => ({
      ...prevData,
      podkategoria: value,
    }));
    if(!value || value === '') {
      setErrorForm((prevData) => ({
        ...prevData,
        podkategoria: true,
      }))
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        podkategoria: false,
      }))
    }
  };
  
  const handleDatePickerChange = (date: dayjs.Dayjs | null, context: FieldChangeHandlerContext<DateValidationError>) => {
    if(date) {
      setFormData((prevState) => {
        return {
          ...prevState,
          data: date.toDate()
        }
      })
    }
    
    if(context.validationError) {
      setErrorForm((prevData) => ({
        ...prevData,
        data: true,
      }))
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        data: false,
      }))
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
        value={formData.iloscPunktow}
        onChange={handleIloscPunktowChange}
        margin="normal"
        variant="outlined"
        color={"info"}
        error={errorForm.iloscPunktow}
        helperText={iloscPunktowHelperText}
      />
      <FormControl fullWidth color={"info"} margin={"normal"} error={errorForm.podkategoria}>
        <InputLabel id="demo-simple-select-label" color={"info"}>Podkategoria</InputLabel>
        <Select
          color={"info"}
          value={formData.podkategoria}
          label="Podkategoria"
          onChange={handleSelectChange}
        >
          {AllPodkategorias?.map((podkategoria) => (
            <MenuItem key={podkategoria.idPodKategorii} value={podkategoria.nazwa}>{podkategoria.nazwa}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorForm.podkategoria ? "Podkategoria nie może być pusta" : ""}</FormHelperText>
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
      <Button variant="contained" color="success" startIcon={<AddIcon />} type={"submit"} fullWidth disabled={formInvalid}
       style={{
         margin: "0.5rem auto",
         fontWeight: "bold"
       }}>
        Dodaj
      </Button>
    </form>
  );
};
