import React, {useState} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import {SendOutlined} from "@material-ui/icons";
import MessagesHistory from "./MessagesHistory"
import {useForm} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    rootChatBox: {
        maxWidth: '350px'
    },
    sendMsgContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const fakeMessages = [
    {
        sender: "lanhnh",
        content: "Hi there",
        isMine: false,
    },
    {
        sender: "sonnt",
        content: "Hi :D",
        isMine: true,
    },
    {
        sender: "taidt",
        content: "How are you doing",
        isMine: false,
    },
    {
        sender: "sonnt",
        content: "Yeah I'm good",
        isMine: true,
    },
    {
        sender: "sonnt",
        content: "Very longggg longgggg message here . . . . . ..  . . . . ",
        isMine: true,
    },
]


const ChatBox = () => {
    const classes = useStyles()
    const [listMessages, setListMessages] = useState(fakeMessages)
    const [myMessage, setMyMessage] = useState('')
    const { register, handleSubmit, errors, setError } = useForm();

    const onSendMyMessage = (data) => {
        const {inputMessage} = data
        console.log(inputMessage)
        const message = {
            sender: "sonnt",
            content: inputMessage,
            isMine: true
        }
        setListMessages(listMessages.concat(message))
        setMyMessage('')
    };

    return (
        <div className={classes.rootChatBox}>
            <MessagesHistory messages={listMessages}/>
            <form className={classes.sendMsgContainer} noValidate onSubmit={handleSubmit(onSendMyMessage)}>
                <TextField
                    name="inputMessage"
                    inputRef={register}
                    variant={"outlined"}
                    size={"small"}
                    label={"Message"}
                    autoFocus
                    color={"secondary"}
                    style={{
                        marginRight: "5px",
                    }}
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant={"outlined"}
                    size={"small"}
                    endIcon={<SendOutlined/>}
                >
                    Send
                </Button>
            </form>
        </div>
    )
}

export default ChatBox;