import React from 'react';
import GameInfo from './GameInfo';
import PlayerInfo from './PlayerInfo';
import './styles.scss';

const PlayerBox = ({
    boardId,
    isHost,
    isViewer,
    hostname,
    hostReady,
    guestname,
    guestReady,
    hostAvatar,
    guestAvatar,
    hostCups,
    guestCups,
    time,
    countDownRef,
    countDownKey,
    handleTimeout,
    handleToggleReady,
    handleLeaveRoom,
    handleResign,
    handleDraw,
    handleInvite,
    openOnline,
    setOpenOnline,
}) => {
    return (
        <div className="player-box">
            <PlayerInfo
                isHost={true}
                username={hostname}
                avatar={hostAvatar}
                cups={hostCups}
                ready={hostReady}
            />

            <GameInfo
                boardId={boardId}
                time={time}
                isViewer={isViewer}
                isHost={isHost}
                hostReady={hostReady}
                guestReady={guestReady}
                countDownRef={countDownRef}
                countDownKey={countDownKey}
                handleTimeout={handleTimeout}
                handleToggleReady={handleToggleReady}
                handleLeaveRoom={handleLeaveRoom}
                handleResign={handleResign}
                handleDraw={handleDraw}
            />

            <PlayerInfo
                username={guestname}
                avatar={guestAvatar}
                cups={guestCups}
                ready={guestReady}
            />

            {/* <Typography component="h5" variant="h5">
                Time:{' '}
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
            </Typography>

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
            <Button onClick={handleResign}>Resign</Button>

            <Button onClick={handleDraw}>Draw</Button>

            <Button onClick={() => setOpenOnline(true)}>Invite</Button>
            <OnlineDialog
                handleCloseOnline={() => setOpenOnline(false)}
                handleInvite={handleInvite}
                openOnline={openOnline}
                isInvite={true}
            />

            <Typography variant="body1" className="guest">
                Guestname: <span> {guestname}</span>
                Cups: <span>{guestCups}</span>
                {guestReady && 'Guest is ready'}
                <Avatar src={guestAvatar} />
            </Typography> */}
        </div>
    );
};

export default PlayerBox;
