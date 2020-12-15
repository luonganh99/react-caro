import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';
import Board from './Board';
import ChatBox from './ChatBox';
import './styles.scss';

const Game = () => {
    const { authData } = useAuthContext();
    const { boardId } = useParams();
    const [isHost, setIsHost] = useState(false);
    const [chessman, setChessman] = useState('O');
    const [guestId, setGuestId] = useState(null);
    const [hostId, setHostId] = useState(null);

    // Call api get board info
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await axiosUser.get(`/boards/${boardId}`);

                setGuestId(res.data.boardInfo.guestId);
                setHostId(res.data.boardInfo.hostId);

                if (authData.userInfo.userId === res.data.boardInfo.hostId) {
                    setIsHost(true);
                    setChessman('X');
                }

                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBoard();
    }, []);

    useEffect(() => {
        socket.emit('joinBoard', boardId);
    }, [boardId]);

    return (
        <div>
            <h1>BoardId: {boardId}</h1>
            <div>
                <p>HostId: {hostId}</p>
                <p>GuestId: {guestId}</p>
            </div>
            <div className="gameplay">
                <Board chessman={chessman} boardId={boardId} />
                <ChatBox boardId={boardId} />
            </div>
        </div>
    );
};

export default Game;
