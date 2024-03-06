import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSOP } from '../../Context/ContextProvider';


export const SideBarMenu = () => {
    const [open, setOpen] = React.useState(true);
    const [subOpen, setsubOpen] = React.useState(true)
    const { getUserSession } = useSOP();
    const userSession = getUserSession();
    const hasSub = userSession?.czyMaPodwladnych;
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubClick = () => {
        setsubOpen(!subOpen);
    };

    const handleHistoryClick = () => {
        navigate("/HistoriaOsiagniec")
    };
    const handleMainClick = () => {
        navigate("/UserMainPage")
    };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', color: "white", fontFamily: 'Inter, sans-serif', marginTop:"30px"}}
      component="nav"
      color='primary'
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{background:"transparent",  color: "white", fontWeight:"bold", fontSize:"1rem"}}>
          General
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleMainClick}>
        <ListItemIcon>
            <HomeIcon color='primary'/>
        </ListItemIcon>
        <ListItemText primary="Strona Główna" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
            <LibraryBooksIcon color='primary'/>
        </ListItemIcon>
        <ListItemText primary="Osiagniecia" />
        {!open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleHistoryClick}>
            <ListItemIcon>
                <FiberManualRecordIcon color='primary'/>
            </ListItemIcon>
            <ListItemText primary="Historia osiągnięć" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleHistoryClick}>
            <ListItemIcon>
                <FiberManualRecordIcon color='primary'/>
            </ListItemIcon>
            <ListItemText primary="Zarządzanie osiągnięciami" />
          </ListItemButton>
        </List>
      </Collapse>
        {hasSub ? (
        <ListItemButton onClick={handleSubClick}>
            <ListItemIcon>
            <GroupsIcon color='primary'/>
            </ListItemIcon>
            <ListItemText primary="Podwładni" />
            {!subOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        ) : null}
      <Collapse in={!subOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
                <FiberManualRecordIcon color='primary'/>
            </ListItemIcon>
            <ListItemText primary="PlaceHolder" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
       
  );
}