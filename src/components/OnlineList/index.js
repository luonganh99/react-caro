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
import SocketIOClient from 'socket.io-client';
import avatar from '../../assets/images/avatar.jpg';
import BadgeAvatar from '../BadgeAvatar';

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

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const OnlineList = () => {
    const [userList, setUserList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const socket = SocketIOClient('http://localhost:4000', {
            transports: ['websocket', 'polling', 'flashsocket'],
            withCredentials: true,
            extraHeaders: {
                'my-custom-header': 'abcd',
            },
            query: {
                username: userInfo?.username || userInfo?.email,
            },
        });
        socket.on('getOnlineUserRes', (list) => {
            setUserList(
                list
                    .map((uname) => uname[0])
                    .filter((uname) =>
                        !uname.includes('@')
                            ? uname !== userInfo?.username
                            : uname !== userInfo?.email,
                    ),
            );
        });
        socket.emit('online');

        return () => {
            socket.emit('offline');
        };
    }, []);

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
