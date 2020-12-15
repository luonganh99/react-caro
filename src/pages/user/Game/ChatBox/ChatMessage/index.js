import React from "react";
import {ListItem, ListItemText, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    msgTextContainer:{
        display:'flex'
    },
    inline: {
        display:'inline'
    }
})

const ChatMessage = ({message}) => {
    const {sender, content, isMine} = message;
    const classes = useStyle();

    return (
        <ListItem alignItems="flex-end">
            <ListItemText
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {sender + ": "}
                        </Typography>
                        {content}
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default ChatMessage;