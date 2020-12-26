import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
}));

function InfoBox(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { viewers } = props;

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        Room ID: 1234
                    </Typography>
                </CardContent>
                <AvatarGroup max={4}>
                    {viewers.map((viewer, index) => {
                        return <Avatar key={index} src={viewer.avatar} />;
                    })}
                </AvatarGroup>
            </div>
        </Card>
    );
}

export default InfoBox;
