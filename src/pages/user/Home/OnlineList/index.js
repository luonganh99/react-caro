import {
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import avatar from '../../../../assets/images/avatar.jpg';
import socket from '../../../../commons/socket';
import { useAuthContext } from '../../../../context/AuthContext';
import BadgeAvatar from '../../../../components/BadgeAvatar';

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

const OnlineList = () => {
    const { authData } = useAuthContext();
    const [userList, setUserList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        socket.emit('getOnlineUserReq');
        socket.on('getOnlineUserRes', (data) => {
            setUserList(
                data
                    .map((uname) => uname[0])
                    .filter((uname) =>
                        !uname.includes('@')
                            ? uname !== authData.userInfo.username
                            : uname !== authData.userInfo.email,
                    ),
            );
        });
    }, [authData]);

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Online User</Typography>
                <List dense className={classes.list}>
                    {userList.map((username) => {
                        return (
                            <ListItem key={username} button>
                                <ListItemAvatar>
                                    <BadgeAvatar alt={`Avatar n°${username + 1}`} src={avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={`${username}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </Container>
    );
};

export default OnlineList;
