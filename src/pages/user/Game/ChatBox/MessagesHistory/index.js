import React, {useEffect, useRef} from "react";
import ChatMessage from "../ChatMessage";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    historyContainer:{
        overflow:"auto",
        maxHeight:"300px"
    }
})

const MessagesHistory = ({messages}) => {
    const listMessages = messages
    const classes = useStyles()


    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    });

    return (
        <div className={classes.historyContainer}>
            {
                listMessages.map((msg, index) => {
                    return <ChatMessage key={index} message={msg}/>
                })
            }
            <small ref={scrollRef}></small>
        </div>
    )
}

export default MessagesHistory;