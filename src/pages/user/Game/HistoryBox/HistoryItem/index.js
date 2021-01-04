import { Button } from '@material-ui/core';
import React from 'react';
import './styles.scss';

const HistoryItem = ({ historyItem, index }) => {
    return (
        <Button variant="outlined" color="secondary" className="history-item">
            <div className="index">{index + 1}) </div>
            <div className="item">
                {historyItem.pos.x} - {historyItem.pos.y}
            </div>
        </Button>
    );
};

export default HistoryItem;
