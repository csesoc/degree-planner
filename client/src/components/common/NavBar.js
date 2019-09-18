import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../../constants/appConstants';
import DrawerMenu from './DrawerMenu';

const useStyles = makeStyles({
    icon: {
      color: COLORS.WHITE,
    },
  });

const NavBar = () => {
    
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    function handleDrawerOpen() {
      setDrawerOpen(true);
    }

    function handleDrawerClose() {
      setDrawerOpen(false);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={handleDrawerOpen}>
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <Typography variant="title" color="inherit"> 
                  Plannify
                </Typography>
            </Toolbar>
            <DrawerMenu open={drawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />
        </AppBar>
    );
}

export default NavBar;
