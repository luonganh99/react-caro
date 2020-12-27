import { Avatar, Button, Typography } from '@material-ui/core';
import React from 'react';

function UserInfo(props) {
    const {
        hostname,
        hostReady,
        guestname,
        guestReady,
        hostAvatar,
        guestAvatar,
        hostCups,
        guestCups,
    } = props;

    console.log('hostauvatar');
    console.log(hostAvatar);
    return (
        <div>
            {' '}
            <div className="playerInfo">
                <Typography variant="body1" className="host">
                    Hostname: <span>{hostname}</span>
                    Cups: <span>{hostCups}</span>
                    {hostReady && 'Host is ready'}
                    <Avatar src={hostAvatar} />
                </Typography>

                <Typography variant="body1" className="guest">
                    Guestname: <span> {guestname}</span>
                    Cups: <span>{guestCups}</span>
                    {guestReady && 'Guest is ready'}
                    <Avatar src={guestAvatar} />
                </Typography>
            </div>
        </div>
    );
}

export default UserInfo;
