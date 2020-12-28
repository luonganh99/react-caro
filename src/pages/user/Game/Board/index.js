import { useEffect, useRef, useState } from 'react';
import { axiosUser } from '../../../../api/axiosUser';
import socket from '../../../../commons/socket';
import { BOARD_SIZE } from '../../../../config/board.config';
import Square from './Square';
import './styles.scss';

const Board = (props) => {
    const { squares, onHandleClickSquare } = props;

    const renderSquare = (pos, isHighlight) => {
        return (
            <Square
                isHighlight={isHighlight}
                key={BOARD_SIZE * pos.y + pos.x}
                value={squares[pos.x][pos.y]}
                onHandleClickSquare={() => onHandleClickSquare(pos)}
            />
        );
    };

    let board = Array(BOARD_SIZE).fill(null);
    return (
        <div>
            {board.map((item, i) => {
                let row = Array(BOARD_SIZE).fill(null);
                return (
                    <div key={i} className="board-row">
                        {row.map((item, j) => {
                            let pos = { x: i, y: j };
                            return renderSquare(pos, false);
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
