import React, {Component} from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, TextInput, Filter, ReferenceInput} from 'react-admin';
import SelectInput from "@material-ui/core/Select/SelectInput";

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name or email" source="searchText" alwaysOn />
    </Filter>
);

const UserList = (props) => {
    return <List {...props} pagination={false} filters={<UserFilter />}>
        <Datagrid rowClick={"show"}>
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
