import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import Board from './Board';
import ChatBox from './ChatBox';
import './styles.scss';
import { Button, Container, Typography } from '@material-ui/core';

const Game = () => {
    const { authData } = useAuthContext();
    const { roomId } = useParams();
    const history = useHistory();
    const [isHost, setIsHost] = useState(false);
    const [isViewer, setIsViewer] = useState(false);
    const [chessman, setChessman] = useState('O');
    const [guestname, setGuestname] = useState(null);
    const [hostname, setHostname] = useState(null);
    const [boardId, setBoardId] = useState(null);
    const [hostReady, setHostReady] = useState(false);
    const [guestReady, setGuestReady] = useState(false);

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('getRoomInfo', (roomInfo) => {
            const { host, guest, boardId } = roomInfo;
            setHostname(host.username);
            setHostReady(host.isReady);
            setGuestname(guest.username);
            setGuestReady(guest.isReady);
            setBoardId(boardId);

            if (authData.userInfo.username === host.username) {
                setChessman('X');
                setIsHost(true);
            }
        });

        return () => {
            socket.emit('leaveRoom', { roomId, isHost, isViewer });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const createBoard = async () => {
            try {
                const res = await axiosUser.post('/boards', { guestname });

                setBoardId(res.data.boardId);
                socket.emit('updateBoard', { roomId, boardId: res.data.boardId });
            } catch (error) {
                console.log(error);
            }
        };
        if (hostReady && guestReady && isHost) {
            createBoard();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostReady, guestReady]);

    const handleToggleReady = () => {
        if (isHost) {
            setHostReady((prevHostReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevHostReady });
                return !prevHostReady;
            });
        } else {
            setGuestReady((prevGuestReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevGuestReady });
                return !prevGuestReady;
            });
        }
    };

    const handleLeaveRoom = () => {
        // TODO: Call api update board status
        socket.emit('leaveRoom', { roomId, isHost, isViewer });
        history.push('/home');
    };

    // Call api get board info
    // useEffect(() => {
    //     const fetchBoard = async () => {
    //         try {
    //             const res = await axiosUser.get(`/boards/${boardId}`);

    //             setGuestname(res.data.boardInfo.guestname);
    //             setHostname(res.data.boardInfo.hostname);

    //             if (authData.userInfo.username === res.data.boardInfo.hostname) {
    //                 // setIsHost(true);
    //                 setChessman('X');
    //             }

    //             console.log(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchBoard();
    // }, [authData, boardId]);

    return (
        <Container>
            <Typography variant="h4">BoardId: {boardId}</Typography>
            <div className="playerInfo">
                <Typography variant="body1" className="host">
                    Hostname: <span>{hostname}</span>
                    {hostReady && 'Host is ready'}
                </Typography>
                <Typography variant="body1" className="guest">
                    Guestname: <span> {guestname}</span>
                    {guestReady && 'Guest is ready'}
                </Typography>
            </div>
            <div className="ready">
                <Button variant="contained" color="primary" onClick={handleToggleReady}>
                    Ready
                </Button>
            </div>
            <div className="leave">
                <Button variant="contained" color="primary" onClick={handleLeaveRoom}>
                    Leave Room
                </Button>
            </div>
            <div className="gameplay">
                <Board chessman={chessman} roomId={roomId} boardId={boardId} />
                <ChatBox boardId={boardId} roomId={roomId} />
            </div>
        </Container>
    );
};

export default Game;
