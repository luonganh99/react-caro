import React from 'react';

export default function Square({isHighlight, onHandleClickSquare, value }) {
    return (
        <button className={`square ${isHighlight && 'highlight'}`} onClick={() => onHandleClickSquare()}>
            {value}
        </button>
    );  
}
