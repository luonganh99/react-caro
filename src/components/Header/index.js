import {
    AppBar,
    Avatar,
    IconButton,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core';
import { AccountCircle, ExitToApp, History, KeyboardArrowDown } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import avatar from '../../assets/images/avatar.jpg';

const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: 'auto',
        textDecoration: 'none',
    },
    avatar: {
        marginRight: 10,
        height: 27,
        width: 27,
    },
    iconBtn: {
        marginRight: 10,
    },
    history: {
        marginRight: 20,
    },
    arrow: {
        marginLeft: 5,
    },
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '& .MuiListItemIcon-root': {
            minWidth: 38,
        },
    },
}))(MenuItem);

const Header = () => {
    const { authData, onLogout } = useAuthContext();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    className={classes.title}
                    component={RouterLink}
                    to="/home"
                    color="inherit"
                    variant="h6"
                >
                    Caro Online
                </Typography>

                <IconButton
                    className={classes.history}
                    color="inherit"
                    component={RouterLink}
                    to="/history"
                >
                    <History className={classes.iconBtn} />
                    <Typography variant="body1">History</Typography>
                </IconButton>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar
                        alt="avatar"
                        src={authData.userInfo.avatar ? authData.userInfo.avatar : avatar}
                        className={classes.avatar}
                    />
                    <Typography variant="body1">{authData.userInfo.username}</Typography>
                    <KeyboardArrowDown className={classes.arrow} fontSize="small" />
                </IconButton>
                <StyledMenu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                    <StyledMenuItem component={RouterLink} to="/profile">
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToApp fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledMenuItem>
                </StyledMenu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
