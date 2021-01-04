import React, {Component, useEffect, useState} from 'react';
import {axiosUser} from "../../../../../api/axiosUser";
import {axiosAdmin} from "../../../../../api/axiosAdmin";
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const PlayedGames = (props) => {
    const {userId} = props;
    const classes = useStyles();

    const [listGames, setListGames] = useState([])

    useEffect(()=>{
        const listPlayedGames = async (userId) => {
            try {
                const res = await axiosAdmin.get(`/manage/users/${userId}/boards`);
                console.log("list games: ", res.data)
                setListGames(res.data)
            } catch (error) {
                console.log(error);
            }
        };

        listPlayedGames(userId);
    }, [])

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
                        <ListItemText primary={`Created at: ${moment(game.createdAt).format('DD-MM-YYYY, hh:mm:ss')}`} />
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
}

export default PlayedGames;
