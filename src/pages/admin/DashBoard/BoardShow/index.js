import React, {Component} from 'react';
import {Show, TabbedShowLayout, Tab, TextField, DateField} from 'react-admin';
import ChatsHistory from './ChatsHistory';

const BoardShow = (props) => {
    console.log("Usershow: ", props)
    return <Show title={"User detail"} {...props} >
        <TabbedShowLayout>
            <Tab label={"Board"}>
                <TextField source="boardId" />
                <TextField source="hostname" />
                <TextField source="guestname" />
                <TextField source="status" />
                <TextField source="winner" />
                <TextField source="createdAt" />
                <TextField source="finishedAt" />
            </Tab>
            <Tab label={"Chats history"}>
                <ChatsHistory boardId={props.id}/>
            </Tab>
        </TabbedShowLayout>
    </Show>
}

export default BoardShow;
