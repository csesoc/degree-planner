import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import PathwaysIcon from '@material-ui/icons/Timeline';
import PlannifyIcon from '@material-ui/icons/Stars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
    drawerList: {
      width: 'auto',
    },
    drawerLink: {
      textDecoration: 'none'
    },
});

const DrawerMenu = (props) => {

    const classes = useStyles();

    return (
        <SwipeableDrawer open={props.open} onClose={props.onClose} onOpen={props.onOpen}>
          <List className={classes.drawerList}>
            <Link to='/' className={classes.drawerLink}>
              <ListItem button>
                <ListItemIcon>
                  <PlannifyIcon/>
                </ListItemIcon>
                <ListItemText primary="Plannify" />
              </ListItem>
            </Link>
            <Link to='/pathways' className={classes.drawerLink}>
              <ListItem button>
                <ListItemIcon>
                  <PathwaysIcon/>
                </ListItemIcon>
                <ListItemText primary="Pathways" />
              </ListItem>
            </Link>
          </List> 
        </SwipeableDrawer>
    );
}

export default DrawerMenu;
