import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/* Material-ui Components */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

/* Constants */
import { COLORS } from '../../constants/appConstants';

const useStyles = makeStyles({
    icon: {
      color: COLORS.WHITE,
    },
  });

const NavBar = () => {
    const classes = useStyles();

    const onClickMenu = () => {
        // TODO: this function should open a Drawer, if that's what we want
        console.log('clicked');
    }

    return (
        <AppBar>
            <Toolbar>
                <IconButton onClick={onClickMenu}>
                    <MenuIcon className={classes.icon} />
                </IconButton>
                Plannify
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
