import React, {Component} from 'react';
import {Show, SimpleShowLayout, TextField, DateField} from 'react-admin';
import PostShowActions from './UserShowActions';
import PlayedGames from "./PlayedGames";

const UserShow = (props) => {
    console.log("Usershow: ", props)
   return <Show title={"User detail"} {...props}  actions={<PostShowActions/>}>
       <SimpleShowLayout>
           <TextField source="userId" />
           <TextField source="username" />
           <TextField source="fullname" />
           <TextField source="email" />
           <TextField source="totals" />
           <TextField source="wins" />
           <TextField source="cups" />
           <TextField source="status" />
           <TextField source="role" />
           <DateField label="Created at" source="created_at" />
           <PlayedGames userId={props.id}/>
       </SimpleShowLayout>
   </Show>
}

export default UserShow;
