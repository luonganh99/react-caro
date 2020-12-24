import { useEffect, useRef, useState } from 'react';
import { axiosUser } from '../../../../api/axiosUser';
import socket from '../../../../commons/socket';
import { BOARD_SIZE } from '../../../../config/board.config';
import Square from './Square';
import './styles.scss';

const Board = ({ chessman, roomId, boardId }) => {
    const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const [turn, setTurn] = useState('X');
    const isChecked = useRef(false);

    useEffect(() => {
        socket.on('newMoveChessman', (data) => {
            console.log(data);
            setSquares((prevSquares) => {
                console.log('oldsquares ', prevSquares);
                if (prevSquares[data.pos.x][data.pos.y]) return;
                const newSquares = [...prevSquares];
                const oneRow = [...newSquares[data.pos.x]];
                oneRow[data.pos.y] = data.chessman;
                newSquares[data.pos.x] = oneRow;
                console.log('newsquares ', newSquares);
                return newSquares;
            });
            setLastPos(data.pos);
            isChecked.current = true;
        });
    }, []);

    useEffect(() => {
        const postWinner = async () => {
            try {
                const res = await axiosUser.patch(`/boards/${boardId}`);
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        if (isChecked.current) {
            console.log(isChecked.current);
            console.log('checkwin ', squares, lastPos, turn);
            if (calculateWinner(squares, lastPos, turn)) {
                alert(`${turn} won`);
                if (turn === chessman) {
                    postWinner();
                }
            }
            setTurn((prevTurn) => {
                console.log('prev turn ', prevTurn);
                return prevTurn === 'X' ? 'O' : 'X';
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastPos]);

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

    const onHandleClickSquare = (pos) => {
        console.log(turn, chessman);
        if (boardId && turn === chessman) {
            socket.emit('moveChessman', { roomId, boardId, chessman, pos });
            setSquares((prevSquares) => {
                if (prevSquares[pos.x][pos.y]) return;
                const newSquares = [...prevSquares];
                const oneRow = [...newSquares[pos.x]];
                oneRow[pos.y] = chessman;
                newSquares[pos.x] = oneRow;
                console.log('newsquares ', newSquares);
                return newSquares;
            });
            setLastPos(pos);
            isChecked.current = true;
        }
    };

    const calculateWinner = (squares, pos, chessman) => {
        const { x, y } = pos;
        // check col
        let colCount = 1;
        // check upper col
        for (let i = x - 1; i >= 0; i--) {
            if (squares[i][y] === chessman) {
                colCount++;
            } else {
                break;
            }
        }
        if (colCount >= 5) {
            return true;
        }

        // check lower col
        for (let i = x + 1; i < BOARD_SIZE; i++) {
            if (squares[i][y] === chessman) {
                colCount++;
            } else {
                break;
            }
        }
        if (colCount >= 5) {
            return true;
        }

        // check row
        let rowCount = 1;
        // check left row
        for (let j = y - 1; j >= 0; j--) {
            if (squares[x][j] === chessman) {
                rowCount++;
            } else {
                break;
            }
        }
        if (rowCount >= 5) {
            return true;
        }

        // check right row
        for (let j = y + 1; j < BOARD_SIZE; j++) {
            if (squares[x][j] === chessman) {
                rowCount++;
            } else {
                break;
            }
        }
        if (rowCount >= 5) {
            return true;
        }

        // check diag
        let diagCount = 1;
        // check upper diag
        let i = x - 1;
        let j = y - 1;
        for (i, j; i >= 0 && j >= 0; i--, j--) {
            if (squares[i][j] === chessman) {
                diagCount++;
            } else {
                break;
            }
        }
        if (diagCount >= 5) {
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y + 1;
        for (i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
            if (squares[i][j] === chessman) {
                diagCount++;
            } else {
                break;
            }
        }
        if (diagCount >= 5) {
            return true;
        }

        // check anti diag
        let antiDiagCount = 1;
        // check upper diag
        i = x - 1;
        j = y + 1;
        for (i, j; i >= 0 && j >= 0; i--, j++) {
            if (squares[i][j] === chessman) {
                antiDiagCount++;
            } else {
                break;
            }
        }
        if (antiDiagCount >= 5) {
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y - 1;
        for (i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j--) {
            if (squares[i][j] === chessman) {
                antiDiagCount++;
            } else {
                break;
            }
        }
        if (antiDiagCount >= 5) {
            return true;
        }
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
