import React from 'react';
import HistoryItem from './HistoryItem';
import './styles.scss';

function HistoryBox(props) {
    const { listHistoryItem } = props;
    return (
        <div className="list-history-item">
            {listHistoryItem.map((item, index) => {
                return <HistoryItem key={index} historyItem={item}></HistoryItem>;
            })}
        </div>
    );
}

export default HistoryBox;
