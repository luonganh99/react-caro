import React from 'react';

function HistoryItem(props) {
    const { historyItem } = props;
    return (
        <button>{`${historyItem.username} (${historyItem.chessman}): (${historyItem.pos.x},${historyItem.pos.y})`}</button>
    );
}

export default HistoryItem;
