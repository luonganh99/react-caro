import {
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { axiosAdmin } from '../../../../../api/axiosAdmin';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const PlayedGames = (props) => {
    const { userId } = props;
    const classes = useStyles();

    const [listGames, setListGames] = useState([]);

    useEffect(() => {
        const listPlayedGames = async (userId) => {
            try {
                const res = await axiosAdmin.get(`/manage/users/${userId}/boards`);
                console.log('list games: ', res.data);
                setListGames(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        listPlayedGames(userId);
    }, []);

    return (
        <List className={classes.root}>
            {listGames.map((game) => {
                const labelId = `checkbox-list-label-${game}`;

                return (
                    <ListItem key={game} role={undefined} dense button>
                        <ListItemText primary={`ID: ${game.boardId}`} />
                        <ListItemText primary={`Host: ${game.hostname}`} />
                        <ListItemText primary={`Guest: ${game.guestname}`} />
                        <ListItemText primary={`Winner: ${game.winner}`} />
                        <ListItemText
                            primary={`Created at: ${dayjs(game.createdAt).format(
                                'DD-MM-YYYY, hh:mm:ss',
                            )}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <CommentIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default PlayedGames;
