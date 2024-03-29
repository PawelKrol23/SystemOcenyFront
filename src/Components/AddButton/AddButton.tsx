import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddButton = (onButtonClick: () => void) => {
  return (
    <Button variant="contained" color="success" startIcon={<AddIcon />}
            onClick={onButtonClick}
            style={{
      width: "fit-content",
      margin: "2rem auto",
      fontWeight: "bold"
    }}>
      Dodaj
    </Button>
  )
}
