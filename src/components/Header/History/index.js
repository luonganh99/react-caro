import { Avatar, IconButton, Typography } from '@material-ui/core';
import { EmojiEventsRounded, HistoryRounded, PageviewRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { axiosUser } from '../../../api/axiosUser';
import dayjs from 'dayjs';

import './styles.scss';
import { useHistory } from 'react-router-dom';

const History = ({ userInfo, onClose }) => {
    const [boardList, setBoardList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await axiosUser.get('/boards');

                console.log(res);
                setBoardList(res.data.boardList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBoards();
    }, []);

    const handleReviewClick = (boardId) => {
        onClose();
        history.push(`/board/${boardId}`);
    };

    return (
        <div className="history">
            <div className="history-title">
                <HistoryRounded />
                <Typography variant="h5"> History </Typography>
            </div>

            <div className="history-list">
                {boardList.map((board) => (
                    <div
                        className={`history-box ${
                            board.winner === userInfo.username ? 'win' : 'lose'
                        }`}
                        key={board.boardId}
                    >
                        <div className="user-group">
                            <Avatar />
                            <Typography variant="body1">{board.hostname}</Typography>
                        </div>

                        <div className="history-info">
                            <div className="time">
                                <Typography variant="body1">
                                    {dayjs(board.finishedAt).format('HH:mm A - DD/MM/YYYY')}
                                </Typography>
                            </div>
                            <div className="cup">
                                <EmojiEventsRounded />
                                <Typography variant="body1">{board.cups}</Typography>
                            </div>
                            <IconButton onClick={() => handleReviewClick(board.boardId)}>
                                <PageviewRounded />
                                <Typography variant="body1">Review</Typography>
                            </IconButton>
                        </div>

                        <div className="user-group">
                            <Avatar />
                            <Typography variant="body1">{board.guestname}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
