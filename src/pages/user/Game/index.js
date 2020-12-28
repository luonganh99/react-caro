import { Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { useHistory, useParams } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import socket from '../../../commons/socket';
import { BOARD_SIZE } from '../../../config/board.config';
import { RATE_HIGH, RATE_LOW } from '../../../config/game.config';
import { useAuthContext } from '../../../context/AuthContext';
import Board from './Board';
import ChatBox from './ChatBox';
import HistoryBox from './HistoryBox';
import InfoBox from './InfoBox';
import './styles.scss';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Game = () => {
    const classes = useStyles();
    const { authData, resetAuthData } = useAuthContext();
    const { roomId } = useParams();
    const history = useHistory();

    const [isHost, setIsHost] = useState(false);
    const [isViewer, setIsViewer] = useState(false);
    const [chessman, setChessman] = useState('O');
    const [guestname, setGuestname] = useState(null);
    const [guestAvatar, setGuestAvatar] = useState('');
    const [hostname, setHostname] = useState(null);
    const [hostAvatar, setHostAvatar] = useState('');
    const [boardId, setBoardId] = useState(null);
    const [hostReady, setHostReady] = useState(false);
    const [guestReady, setGuestReady] = useState(false);
    const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const [turn, setTurn] = useState('X');
    const [time, setTime] = useState(null);
    const [listHistoryItem, setListHistoryItem] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [hostCups, setHostCups] = useState(null);
    const [guestCups, setGuestCups] = useState(null);
    const [isWinner, setIsWinner] = useState(null);
    const isChecked = useRef(false);
    let countDownRef = useRef(null);

    useEffect(() => {
        socket.emit('joinRoom', { roomId, cups: authData.userInfo.cups });

        socket.on('getRoomInfo', (roomInfo) => {
            const { host, guest, config } = roomInfo;
            setHostname(host.username);
            setHostReady(host.isReady);
            setGuestname(guest.username);
            setGuestReady(guest.isReady);
            setBoardId(roomInfo.boardId);
            setTime(config.time);
            setViewers(roomInfo.viewers);
            setHostAvatar(host.avatar);
            setGuestAvatar(guest.avatar);
            setHostCups(host.cups);
            setGuestCups(guest.cups);

            if (authData.userInfo.username === host.username) {
                setChessman('X');
                setIsHost(true);
            }
        });

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
            console.log(data.pos);
            isChecked.current = true;
            setLastPos(data.pos);

            setListHistoryItem((prelistHistoryItem) => {
                const historyItem = {
                    username: data.sender,
                    chessman: data.chessman,
                    pos: data.pos,
                };
                return [...prelistHistoryItem, historyItem];
            });

            console.log(isChecked.current);
            console.log('start');
        });

        return () => {
            socket.emit('leaveRoom', { roomId, isHost, isViewer });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const createBoard = async () => {
            try {
                console.log('jdkjshdksdjh');
                const res = await axiosUser.post('/boards', { guestname });

                setBoardId(res.data.boardId);
                socket.emit('updateBoard', { roomId, boardId: res.data.boardId });
            } catch (error) {
                console.log(error);
            }
        };
        if (hostReady && guestReady && isHost) {
            createBoard();
        }
        if (hostReady && guestReady) {
            countDownRef.current.start();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostReady, guestReady]);

    useEffect(() => {
        console.log('Check win');

        console.log(isChecked.current);
        if (isChecked.current) {
            console.log(isChecked.current);
            console.log('checkwin ', squares, lastPos, turn);
            if (calculateWinner(squares, lastPos, turn)) {
                if (turn === chessman) {
                    setIsWinner(true);
                } else {
                    setIsWinner(false);
                }
                alert(`${turn} won`);
            }
            setTurn((prevTurn) => {
                console.log('prev turn ', prevTurn);
                return prevTurn === 'X' ? 'O' : 'X';
            });
            countDownRef.current.start();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastPos]);

    useEffect(() => {
        const postWinner = async (boardId, cups) => {
            try {
                const res = await axiosUser.patch(`/boards/${boardId}`, { cups });
                return res;
            } catch (error) {
                console.log(error);
            }
        };

        const patchUserInfo = async (cups, wins, total) => {
            try {
                await axiosUser.patch(`/users/patch`, { cups, wins, total });
                const res = await axiosUser.get(`/users/${authData.userInfo.userId}`);
                resetAuthData(res);
            } catch (error) {
                console.log(error);
            }
        };

        if (isWinner !== null) {
            let rate;
            if (
                (isHost && isWinner && hostCups > guestCups) ||
                (!isHost && isWinner && hostCups < guestCups)
            ) {
                rate = RATE_LOW;
            } else {
                rate = RATE_HIGH;
            }
            console.log(rate);
            const cups = Math.round(Math.abs(hostCups - guestCups) * rate, 0);
            console.log(cups);
            if (isWinner === true) {
                postWinner(boardId, cups);
                patchUserInfo(
                    authData.userInfo.cups + cups,
                    authData.userInfo.wins + 1,
                    authData.userInfo.total + 1,
                );
                socket.emit('updateRoom', {
                    newCups: cups,
                    isHost,
                    roomId,
                });
            } else if (isWinner === false) {
                patchUserInfo(
                    authData.userInfo.cups - cups,
                    authData.userInfo.wins,
                    authData.userInfo.total + 1,
                );
            }
            countDownRef.current.stop();
        }
    }, [isWinner]);

    const handleToggleReady = () => {
        if (isHost) {
            setHostReady((prevHostReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevHostReady });
                return !prevHostReady;
            });
        } else {
            setGuestReady((prevGuestReady) => {
                socket.emit('updateReady', { roomId, isHost, isReady: !prevGuestReady });
                return !prevGuestReady;
            });
        }
    };

    const handleLeaveRoom = () => {
        // TODO: Call api update board status
        socket.emit('leaveRoom', { roomId, isHost, isViewer });
        history.push('/home');
    };

    const onHandleClickSquare = (pos) => {
        console.log(turn, chessman);
        if (boardId && turn === chessman) {
            console.log('move chessman');
            let username = isHost ? hostname : guestname;
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

            //save item history move

            const historyItem = {
                username,
                chessman,
                pos,
            };
            const newListHistoryItem = [...listHistoryItem, historyItem];
            setListHistoryItem(newListHistoryItem);
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

    const handleTimeout = () => {
        if (turn !== chessman) {
            setIsWinner(true);
        } else {
            setIsWinner(false);
        }
        alert(`${turn === 'X' ? 'O' : 'X'} won`);
    };

    const renderer = ({ seconds }) => {
        return <span>{seconds}</span>;
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <UserInfo
                            boardId={boardId}
                            hostname={hostname}
                            hostReady={hostReady}
                            guestname={guestname}
                            guestReady={guestReady}
                            hostAvatar={hostAvatar}
                            guestAvatar={guestAvatar}
                            hostCups={hostCups}
                            guestCups={guestCups}
                        ></UserInfo>
                        <Typography component="h5" variant="h5">
                            Time:{' '}
                            <Countdown
                                date={Date.now() + time * 1000}
                                ref={countDownRef}
                                autoStart={false}
                                renderer={renderer}
                                onComplete={handleTimeout}
                            />
                        </Typography>
                    </Paper>
                    <div className="ready">
                        <Button variant="contained" color="primary" onClick={handleToggleReady}>
                            Ready
                        </Button>
                    </div>
                    <div className="leave">
                        <Button variant="contained" color="primary" onClick={handleLeaveRoom}>
                            Leave Room
                        </Button>
                    </div>
                    <div className="gameplay"></div>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <InfoBox viewers={viewers} boardId={boardId} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        {' '}
                        <Board squares={squares} onHandleClickSquare={onHandleClickSquare} />
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <HistoryBox listHistoryItem={listHistoryItem}></HistoryBox>
                    </Paper>
                    <Paper className={classes.paper}>
                        <ChatBox boardId={boardId} roomId={roomId} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Game;
