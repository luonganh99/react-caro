import React, {Component} from 'react';
import {
    Edit,
    TextInput,
    DateInput,
    SimpleForm,
} from 'react-admin';

const UserEdit = (props)=>{
    return (
        <Edit title={"Edit User"} {...props} undoable={false}>
            <SimpleForm>
                <TextInput disabled source={'id'}/>
                <TextInput source={'username'}/>
                <TextInput source={'fullname'}/>
                <TextInput source={'email'}/>
                <DateInput disabled source={'createdAt'}/>
                <TextInput disabled source={'wins'}/>
                <TextInput disabled source={'cups'}/>
            </SimpleForm>
        </Edit>
    )
}


export default UserEdit;
