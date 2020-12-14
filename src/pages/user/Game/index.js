import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardRes, joinBoard, moveChessman, newMoveChessman } from '../../../commons/socket';
import { useAuthContext } from '../../../context/AuthContext';

const Game = () => {
    const { authData } = useAuthContext();
    const { boardId } = useParams();
    const [counter, setCounter] = useState(0);
    const [isHost, setIsHost] = useState(false);
    console.log('OUTPUT ~ file: index.js ~ line 11 ~ Game ~ isHost', isHost);

    useEffect(() => {
        joinBoard(boardId);
        newMoveChessman((err, data) => {
            if (err) return;

            console.log(data);
        });

        getBoardRes((err, data) => {
            if (err) return;

            if (data.hostId === authData.userInfo.userId) {
                setIsHost(true);
            }

            console.log(data);
        });
    }, [boardId, authData]);

    const handleMove = () => {
        moveChessman({ boardId, side: 0, index: counter + 1 });
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1>BoardId: {boardId}</h1>
            <button onClick={handleMove}>Move</button>
        </div>
    );
};

export default Game;
