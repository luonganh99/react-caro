import React, {Component} from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, TextInput, Filter, ReferenceInput} from 'react-admin';
import SelectInput from "@material-ui/core/Select/SelectInput";

const BoardList = (props) => {
    return <List {...props} pagination={false}>
        <Datagrid rowClick={"show"}>
            <TextField source={'boardId'}/>
            <TextField source={'hostname'}/>
            <TextField source={'guestname'}/>
            <TextField source={'winner'}/>
            <DateField source={'createdAt'}/>
        </Datagrid>
    </List>
}


export default BoardList;
