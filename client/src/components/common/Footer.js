import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../../constants/appConstants';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: '#3F51BA',
        color: COLORS.WHITE,
        padding: theme.spacing(6),
    }
  }));

const Footer = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="white" component="p">
            Plannify is provided by CSESoc UNSW and associated contributors "as is" and In no event shall CSESoc and associated contributors be held liable for any direct, indirect, incidental, special, exemplary or consequential damages (including, but not limited to, program planning complications and the misrepresentation of UNSW handbook information) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage.
            </Typography>
        </div>
    );
}

export default Footer;
