import { Typography } from '@material-ui/core';
import { HistoryRounded } from '@material-ui/icons';
import React from 'react';
import HistoryItem from './HistoryItem';
import './styles.scss';

const HistoryBox = ({ listHistoryItem, hostname, guestname, handleHistoryItemClick }) => {
    return (
        <div className="history-box">
            <div className="history">
                <HistoryRounded />
                <Typography>History</Typography>
            </div>
            <div className="header">
                <div className="header-item">
                    <Typography>{hostname}</Typography>
                    <Typography>(X)</Typography>
                </div>

                <div className="header-item">
                    <Typography>{guestname}</Typography>
                    <Typography>{guestname && '(O)'} </Typography>
                </div>
            </div>
            <div className="list-history-item">
                {listHistoryItem.map((item, index) => {
                    return (
                        <HistoryItem
                            key={index}
                            index={index}
                            historyItem={item}
                            handleHistoryItemClick={handleHistoryItemClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryBox;
