import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import './styles.scss';

const Home = () => {
    const history = useHistory();
    const [boardId, setBoardId] = useState('');

    const handleCreate = async () => {
        try {
            const res = await axiosUser.post('/boards');

            console.log(res.data.boardId);

            history.push(`/games/${res.data.boardId}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleJoinGame = () => {
        history.push(`/games/${boardId}`);
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
                <Link
                    to="/online-user"
                    className="onlineList"
                    component={Button}
                    variant="outlined"
                    color="primary"
                >
                    {' '}
                    Online List{' '}
                </Link>
                <Link
                    to="/result"
                    className="resultList"
                    component={Button}
                    variant="outlined"
                    color="primary"
                >
                    Result
                </Link>
            </div>
        </Container>
    );
};

export default Home;
