import {
    Button,
    Dialog,
    DialogContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Slide,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GroupRounded } from '@material-ui/icons';
import React, { forwardRef, useEffect, useState } from 'react';
import avatar from '../../assets/images/avatar.jpg';
import socket from '../../commons/socket';
import { useAuthContext } from '../../context/AuthContext';
import BadgeAvatar from '../BadgeAvatar';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        maxWidth: 600,
        margin: '50px auto',
    },
    paper: {
        height: '90vh',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OnlineList = () => {
    const { authData } = useAuthContext();
    const [userList, setUserList] = useState([]);
    const [openOnline, setOpenOnline] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (openOnline) {
            socket.emit('getOnlineUserReq');
        }
    }, [openOnline]);

    useEffect(() => {
        socket.on('getOnlineUserRes', (data) => {
            setUserList(
                data
                    .map((uname) => uname[0])
                    .filter((uname) => uname !== authData.userInfo.username),
                // .filter((uname) =>
                //     !uname.includes('@')
                //         ? uname !== authData.userInfo.username
                //         : uname !== authData.userInfo.email,
                // ),
            );
        });
    }, [authData]);

    const handleOpenOnline = () => {
        setOpenOnline(true);
    };

    const handleCloseOnline = () => {
        setOpenOnline(false);
    };

    return (
        <div className="online-user">
            <GroupRounded onClick={handleOpenOnline} className="btn-online-user" />
            <Dialog
                open={openOnline}
                onClose={handleCloseOnline}
                fullWidth={true}
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogContent>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">Online User</Typography>
                        <List dense className={classes.list}>
                            {userList.map((username) => {
                                return (
                                    <ListItem key={username} button>
                                        <ListItemAvatar>
                                            <BadgeAvatar
                                                alt={`Avatar n°${username + 1}`}
                                                src={avatar}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${username}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OnlineList;
