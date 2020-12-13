import { useEffect, useState } from 'react';
import Square from './Square';
import './styles.scss';

const BOARD_SIZE = 20;



export default function Board(props) {
    const [myChessman, setMyChessman] = useState('X');
    const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    const [lastPos, setLastPos] = useState({x: 0, y:0});

    useEffect(() => {
        if (calculateWinner(squares, lastPos, myChessman)){
            alert("You win!")
        }
    }, [squares])
    
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
        setLastPos(pos);
    }

    function calculateWinner(squares, pos, chessman) {

        const {x, y} = pos;
        // check col
        let colCount = 1;
        // check upper col
        for(let i = x - 1; i >= 0; i--){
            if(squares[i][y] === chessman){
                colCount++;
            }else{
                break;
            }
        }
        if(colCount >= 5){
            return true;
        }
        
        // check lower col
        for(let i = x + 1; i < BOARD_SIZE; i++){
            if(squares[i][y] === chessman){
                colCount++;
            }else{
                break;
            }
        }
        if(colCount >= 5){
            return true;
        }
        
        
        // check row
        let rowCount = 1;
        // check left row
        for(let j = y - 1; j >= 0; j--){
            if(squares[x][j] === chessman){
                rowCount++;
            }else{
                break;
            }
        }
        if(rowCount >= 5){
            return true;
        }
        
        // check right row
        for(let j = y + 1; j < BOARD_SIZE; j++){
            if(squares[x][j] === chessman){
                rowCount++;
            }else{
                break;
            }
        }
        if(rowCount >= 5){
            return true;
        }

        // check diag
        let diagCount = 1;
        // check upper diag
        let i = x - 1;
        let j = y - 1;
        for(i, j; i >= 0 && j >= 0; i--, j--){
            if(squares[i][j] === chessman){
                diagCount++;
            }
            else{
                break;
            }
        }
        if(diagCount >= 5){
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y + 1;
        for(i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++){
            if(squares[i][j] === chessman){
                diagCount++;
            }
            else{
                break;
            }
        }
        if(diagCount >= 5){
            return true;
        }


        // check anti diag
        let antiDiagCount = 1;
        // check upper diag
        i = x - 1;
        j = y + 1;
        for(i, j; i >= 0 && j >= 0; i--, j++){
            if(squares[i][j] === chessman){
                antiDiagCount++;
            }
            else{
                break;
            }
        }
        if(antiDiagCount >= 5){
            return true;
        }

        // check lower diag
        i = x + 1;
        j = y - 1;
        for(i, j; i < BOARD_SIZE && j < BOARD_SIZE; i++, j--){
            if(squares[i][j] === chessman){
                antiDiagCount++;
            }
            else{
                break;
            }
        }
        if(antiDiagCount >= 5){
            return true;
        }
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
