import { Button, Container, TextField, Typography } from '@material-ui/core';
import { VideogameAssetRounded, ViewList, ViewListRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import './styles.scss';

const Home = () => {
    const history = useHistory();
    const { authData } = useAuthContext();
    // const [boardId, setBoardId] = useState('');

    useEffect(() => {
        socket.on('joinRoom', (roomId) => {
            console.log(roomId);
            history.push(`/room/${roomId}`);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePlayNowClick = () => {
        socket.emit('playNow', { cups: authData.userInfo.cups });
    };

    return (
        <Container className="container">
            <Typography className="title" variant="h1" color="primary">
                Caro Online
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<VideogameAssetRounded />}
                onClick={handlePlayNowClick}
                className="btn-playnow"
            >
                Play Now
            </Button>

            <div className="btn-group">
                <Button
                    className="btn-room"
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<ViewListRounded />}
                    component={RouterLink}
                    to="/room"
                >
                    Room
                </Button>

                <Button
                    className="btn-rank"
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to="/rank"
                >
                    Rank
                </Button>
            </div>

            {/* <Button
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
            </div> */}
        </Container>
    );
};

export default Home;
