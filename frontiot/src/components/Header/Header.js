import React, { useState } from 'react';
import './Header.css';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import AppBar   from '@material-ui/core/AppBar';
import Toolbar  from '@material-ui/core/Toolbar';
import Button   from '@material-ui/core/Button';
import IconButton   from '@material-ui/core/IconButton';
import MenuIcon     from '@material-ui/icons/Menu';
import Typography   from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { isAuthenticated, logout}  from '../../services/auth'

const menuItems = [
    { text: "Home", link: "/",  icon: () => <HomeIcon/> },
    { text: "My Devices", link: "/devices", icon: () => <DevicesOtherIcon/> },
    { text: "Device's History", link: "/devices-history", icon: () => <HistoryIcon/> },
    { text: "About the Project", link: "/about-the-project", icon: () => <InfoIcon/> },
]

function Header(props){ 

    const history = useHistory();
    const [ drawerVisible, setDrawerVisible ] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) 
          return;
        setDrawerVisible(open)
    };

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
        history.push("/");
    }

    return(
        <header className="header">
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} >
                        <MenuIcon />
                    </IconButton>
                    
                    <Typography variant="h6">
                        <strong>SSC0952 IoT Web Project</strong>
                    </Typography>

                    { isAuthenticated() && 
                        <Button color="inherit" endIcon={<ExitToAppIcon/>} onClick={handleLogout}>
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            
            <Drawer className="main-menu" anchor="left" open={drawerVisible} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <ListItemIcon><SchoolIcon/></ListItemIcon>
                        <ListItemText primary="SSC0952 IoT Project" />
                    </ListItem>
                </List>

                <Divider/>
                
                <List>
                    { menuItems.map((item, index) => (
                        <ListItem button onClick={toggleDrawer(false)} key={item.text} component={RouterLink} to={item.link}>
                            <ListItemIcon> { item.icon() }</ListItemIcon>
                            <ListItemText primary={ item.text } />
                        </ListItem>
                    ))}

                    <ListItem button component={Link}  href="https://github.com/GabrielVanLoon/projeto-iot-app" target="_blank" color="inherit">
                        <ListItemIcon> <GitHubIcon/></ListItemIcon>
                        <ListItemText primary="Github Repository" />
                    </ListItem>
                </List>
            </Drawer>

        </header>
    );
}

export default Header