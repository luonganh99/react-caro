import { Avatar, Button, Typography } from '@material-ui/core';
import React from 'react';

function UserInfo(props) {
    const { boardId, hostname, hostReady, guestname, guestReady } = props;
    return (
        <div>
            {' '}
            <div className="playerInfo">
                <Typography variant="body1" className="host">
                    Hostname: <span>{hostname}</span>
                    {hostReady && 'Host is ready'}
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Typography>

                <Typography variant="body1" className="guest">
                    Guestname: <span> {guestname}</span>
                    {guestReady && 'Guest is ready'}
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Typography>
            </div>
        </div>
    );
}

export default UserInfo;
