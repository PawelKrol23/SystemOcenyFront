import TempUser from "../../Assets/TempUser.png"
import { useSOP } from "../../Context/ContextProvider";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
    const { getUserSession, logout } = useSOP();
    const userSession = getUserSession(); 
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
    handleClose();
    logout();
    navigate("/");
    };
 return (
    
  <div className="UserHeader" style={{
    display: "flex",
    width: "100%",
    height: "50px",
    borderBottom: "1px solid rgba(29, 55, 78, 0.3)",
    overflow: "hidden",
    justifyContent: "end",
    alignItems: "center",
    font:"main"
  }}>
    <img src={TempUser} alt="Temporary User" style={{width: "35px", height: "35px"}}/>
    <div style={{
        marginRight: "30px",
    }}>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="secondary"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {userSession?.rola}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  </div>
 );
}
