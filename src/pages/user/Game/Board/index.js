import { BOARD_SIZE } from '../../../../config/board.config';
import Square from './Square';
import './styles.scss';

const Board = ({ squares, onHandleClickSquare }) => {
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
        <div className="board">
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
