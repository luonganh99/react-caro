import { useState } from 'react';
import Square from './Square';
import './styles.scss';

const BOARD_SIZE = 20;



export default function Board(props) {
    // const [history, setHitory] = useState([
    //     {
    //         squares: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)),
    //         curLocation: null,
    //     },
    // ]);
    // const [stepNumber, setStepNumber] = useState(0);
    // const [sortOrder, setSortOrder] = useState(true);

    const [myChessman, setMyChessman] = useState('X');
    const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)))
    
    function renderSquare(pos, isHighlight) {
        return (
            <Square
                isHighlight={isHighlight}
                key={pos}
                value={squares[pos.x][pos.y]}
                onHandleClickSquare={() => onHandleClickSquare(pos)}
            />
        );
    }

    function onHandleClickSquare(pos) {
        if(squares[pos.x][pos.y]) return;
        const newSquares = [...squares]
        const oneRow = [...newSquares[pos.x]];
        oneRow[pos.y] = myChessman
        newSquares[pos.x] = oneRow
        setSquares(newSquares);
    }

    let board = Array(BOARD_SIZE).fill(null);
    return (
        <div>
            {board.map((item, i) => {
                let row = Array(BOARD_SIZE).fill(null);
                return (
                    <div key={i} className='board-row'>
                        {row.map((item, j) => {
                            let pos = {x: i, y: j}
                            return renderSquare(pos, false);     
                        })}
                    </div>
                );
            })}
        </div>
    );
}
