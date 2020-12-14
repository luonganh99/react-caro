import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';

const Home = () => {
    const history = useHistory();
    const [boardId, setBoardId] = useState('');
    console.log('OUTPUT ~ file: index.js ~ line 9 ~ Home ~ boardId', boardId);

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
        <div>
            <h1>Home Page</h1>
            <button onClick={handleCreate}>Create game</button>
            <input
                type="number"
                name="boardId"
                value={boardId}
                onChange={(e) => setBoardId(e.target.value)}
            />
            <button onClick={handleJoinGame}>Join</button>
            <Link to="/onlineusers"> Online List </Link>
        </div>
    );
};

export default Home;