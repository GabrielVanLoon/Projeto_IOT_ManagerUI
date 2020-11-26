import React, { useState } from 'react';
import './Header.css';

import AppBar   from '@material-ui/core/AppBar';
import Toolbar  from '@material-ui/core/Toolbar';
import Button   from '@material-ui/core/Button';
import IconButton   from '@material-ui/core/IconButton';
import MenuIcon     from '@material-ui/icons/Menu';
import Typography   from '@material-ui/core/Typography';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import { isAuthenticated }  from '../../services/auth'

function Header(props){ 

    const [ drawerVisible, setDrawerVisible ] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) 
          return;
        setDrawerVisible(open)
    };

    return(
        <header className="header">
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" >
                        <MenuIcon onClick={toggleDrawer(true)} />
                    </IconButton>
                    
                    <Typography variant="h6">
                        <strong>IOT Application</strong>
                    </Typography>

                    { !isAuthenticated() && 
                         <Button color="inherit">Login</Button>
                    }

                    { isAuthenticated() && 
                        <Button color="inherit">Logout</Button>
                    }

                </Toolbar>
            </AppBar>

            <Drawer className="main-menu" anchor="left" open={drawerVisible} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <strong>Internet no Mi</strong>
                    </ListItem>
                </List>

                <Divider/>
                
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </header>
    );
}

export default Header