import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export interface AddButtonProps {
  onClick: () => void
}

export const AddButton = (props: AddButtonProps) => {
  return (
    <Button variant="contained" color="success" startIcon={<AddIcon />}
            onClick={props.onClick}
            style={{
      width: "fit-content",
      margin: "2rem auto",
      fontWeight: "bold"
    }}>
      Dodaj
    </Button>
  )
}
