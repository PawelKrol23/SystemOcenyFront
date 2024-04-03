import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { OsiagniecieForm } from "./OsiagniecieForm/OsiagniecieForm.tsx";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface OsiagniecieFormModalProps {
  open: boolean,
  onClose: () => void
}

export const OsiagniecieFormModal = (props: OsiagniecieFormModalProps) => {
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OsiagniecieForm/>
        </Box>
      </Modal>
    </div>
  );
}
