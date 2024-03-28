import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddButton = () => {
  return (
    <Button variant="contained" color="success" startIcon={<AddIcon />}>
      Dodaj
    </Button>
  )
}
