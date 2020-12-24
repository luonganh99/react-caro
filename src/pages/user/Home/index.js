import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import './styles.scss';

const Home = () => {
    const history = useHistory();
    const [boardId, setBoardId] = useState('');

    useEffect(() => {
        socket.on('joinRoom', (roomId) => {
            console.log(roomId);
            history.push(`/room/${roomId}`);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = async () => {
        // try {
        //     const res = await axiosUser.post('/boards');

        // } catch (error) {
        //     console.log(error);
        // }
        socket.emit('createRoom');
    };

    const handleJoinGame = () => {
        history.push(`/room/${boardId}`);
    };

    return (
        <Container className="container">
            <Typography variant="h2">Caro Online</Typography>
            <Button
                className="createGameBtn"
                variant="contained"
                color="primary"
                onClick={handleCreate}
            >
                Create new game
            </Button>
            <div className="joinGame">
                <TextField
                    variant="outlined"
                    size="small"
                    label="Room ID"
                    name="boardId"
                    value={boardId}
                    onChange={(e) => setBoardId(e.target.value)}
                />
                <Button
                    className="joinGameBtn"
                    variant="contained"
                    color="secondary"
                    onClick={handleJoinGame}
                >
                    Join
                </Button>
            </div>
            <div className="link">
                <Button
                    to="/online-user"
                    className="onlineList"
                    component={RouterLink}
                    variant="outlined"
                    color="primary"
                >
                    {' '}
                    Online List{' '}
                </Button>
                <Button
                    to="/result"
                    className="resultList"
                    component={RouterLink}
                    variant="outlined"
                    color="primary"
                >
                    Result
                </Button>
            </div>
        </Container>
    );
};

export default Home;
