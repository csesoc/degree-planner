import React from 'react';

import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {COLORS} from '../../constants/appConstants';
import Popover from '@material-ui/core/Popover';


// The footer is split into two.
// one is real, which is fixed at bottom and displayed.
// another is a placeholder, is absolute after the contents.
// the reason to use two is to make sure that none of the contents are not hidden by the real footer
// because the fixed real footer does not take up space
const useStyles = makeStyles(theme => ({
    footer: {
        // this is the real footer
        backgroundColor: '#3F51BA',
        color: COLORS.WHITE,
        padding: '1em',
        overflow: 'hidden',
        width: '100%',
        bottom: 0,
        position: 'fixed'
    },
    footerPlaceOccupier: {
        // this occupies place after all contents so that real
        // footer does not hide any contents
        visibility: 'hidden',
        padding: '1em',
        width: '100%',
        position: 'absolute'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        width: '80%',
        padding: theme.spacing(1),
    },
}));

const Footer = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {/*
                // this is the real footer
            */}
            <div className={classes.footer}>
                <Typography
                    variant="subtitle1" align="center" color="white" component="p"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    Made with ♥️ by CSESoc UNSW
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography>
                        Plannify is provided by CSESoc UNSW and associated contributors "as is" and In no event
                        shall CSESoc and associated contributors be held liable for any direct, indirect, incidental,
                        special, exemplary or consequential damages (including, but not limited to, program planning
                        complications and the misrepresentation of UNSW handbook information) however caused and on any
                        theory of liability, whether in contract, strict liability, or tort (including negligence or
                        otherwise) arising in any way out of the use of this software, even if advised of the
                        possibility of
                        such damage.
                    </Typography>
                </Popover>
            </div>

            {/*
                // this occupies place after all contents so that real
                // footer does not hide any contents
            */}
            <div className={classes.footerPlaceOccupier}>
                <Typography
                    variant="subtitle1" align="center" color="white" component="p"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                >
                    Made with ♥️ by CSESoc UNSW
                </Typography>
            </div>
        </>
    );
}

export default Footer;
