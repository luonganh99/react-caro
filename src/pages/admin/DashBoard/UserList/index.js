import React, {Component} from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin';

const UserList = (props) => {
    return <List {...props}>
        <Datagrid>
            <TextField source={'userId'}/>
            <TextField source={'username'}/>
            <TextField source={'fullname'}/>
            <TextField source={'email'}/>
            <DateField source={'createdAt'}/>
            <TextField source={'wins'}/>
            <TextField source={'cups'}/>
            <EditButton basePath={'/users'}/>
            <DeleteButton basePath={'/users'}/>
        </Datagrid>
    </List>
}


export default UserList;
