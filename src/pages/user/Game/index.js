import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import Board from './Board';
import ChatBox from './ChatBox';
import './styles.scss';
import { Container, Typography } from '@material-ui/core';

const Game = () => {
    const { authData } = useAuthContext();
    const { boardId } = useParams();
    // const [isHost, setIsHost] = useState(false);
    const [chessman, setChessman] = useState('O');
    const [guestname, setGuestname] = useState(null);
    const [hostname, setHostname] = useState(null);

    // Call api get board info
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await axiosUser.get(`/boards/${boardId}`);

                setGuestname(res.data.boardInfo.guestname);
                setHostname(res.data.boardInfo.hostname);

                if (authData.userInfo.username === res.data.boardInfo.hostname) {
                    // setIsHost(true);
                    setChessman('X');
                }

                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBoard();
    }, [authData, boardId]);

    useEffect(() => {
        socket.emit('joinBoard', boardId);
    }, [boardId]);

    return (
        <Container>
            <Typography variant="h4">BoardId: {boardId}</Typography>
            <div className="playerInfo">
                <Typography variant="body1" className="host">
                    Hostname: <span>{hostname}</span>
                </Typography>
                <Typography variant="body1" className="guest">
                    Guestname: <span> {guestname}</span>
                </Typography>
            </div>
            <div className="gameplay">
                <Board chessman={chessman} boardId={boardId} />
                <ChatBox boardId={boardId} />
            </div>
        </Container>
    );
};

export default Game;
