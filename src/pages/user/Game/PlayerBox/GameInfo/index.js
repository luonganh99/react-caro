import { Button, IconButton, Typography } from '@material-ui/core';
import {
    AccessTimeRounded,
    FlagRounded,
    ThumbDownRounded,
    ThumbsUpDownRounded,
    ThumbUpRounded,
} from '@material-ui/icons';
import React from 'react';
import Countdown from 'react-countdown';
import './styles.scss';

const GameInfo = ({
    boardId,
    isHost,
    isViewer,
    hostReady,
    guestReady,
    time,
    countDownRef,
    countDownKey,
    handleTimeout,
    handleToggleReady,
    handleLeaveRoom,
    handleResign,
    handleDraw,
}) => {
    const renderer = ({ seconds }) => {
        return (
            <div className="count-down">
                <AccessTimeRounded />
                <Typography>{seconds}</Typography>
            </div>
        );
    };

    console.log(isViewer);
    console.log(isViewer);

    return (
        <div className="game-info">
            <div className={`game-playing ${boardId ? 'display' : 'hide'}`}>
                {/* <div className={`game-playing ${boardId ? 'hide' : 'display'}`}> */}
                <Countdown
                    date={Date.now() + time * 1000}
                    ref={countDownRef}
                    key={countDownKey}
                    overtime={false}
                    autoStart={false}
                    controlled={false}
                    renderer={renderer}
                    onComplete={handleTimeout}
                />

                <div className="button-group">
                    <Button
                        variant="contained"
                        color="secondary"
                        className="resign"
                        onClick={handleResign}
                        startIcon={<FlagRounded />}
                    >
                        Resign
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="draw"
                        onClick={handleDraw}
                        startIcon={<ThumbsUpDownRounded />}
                    >
                        Draw
                    </Button>
                </div>
            </div>
            <div className={`game-waiting ${boardId ? 'hide' : 'display'}`}>
                {/* <div className={`game-waiting ${boardId ? 'display' : 'hide'}`}> */}
                <Typography variant="h5" className="vs">
                    VS
                </Typography>
                {!isViewer &&
                    (isHost ? (
                        hostReady ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleToggleReady}
                                startIcon={<ThumbDownRounded />}
                            >
                                Not Ready
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleToggleReady}
                                startIcon={<ThumbUpRounded />}
                            >
                                Ready
                            </Button>
                        )
                    ) : guestReady ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleToggleReady}
                            startIcon={<ThumbDownRounded />}
                        >
                            Not Ready
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleToggleReady}
                            startIcon={<ThumbUpRounded />}
                        >
                            Ready
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default GameInfo;
