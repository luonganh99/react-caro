import { Typography } from '@material-ui/core';
import { HistoryRounded } from '@material-ui/icons';
import React from 'react';
import HistoryItem from './HistoryItem';
import './styles.scss';

const HistoryBox = ({ listHistoryItem, hostname, guestname }) => {
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
                    <Typography>(O)</Typography>
                </div>
            </div>
            <div className="list-history-item">
                {listHistoryItem.map((item, index) => {
                    return <HistoryItem key={index} index={index} historyItem={item}></HistoryItem>;
                })}
            </div>
        </div>
    );
};

export default HistoryBox;
