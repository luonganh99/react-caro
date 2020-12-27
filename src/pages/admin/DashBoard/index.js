import React from 'react';
import {Admin, Resource} from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import UserList from './UserList';
import UserEdit from './UserEdit';

const DashBoard = ()=>{
    return <Admin dataProvider={restProvider("http://localhost:4000/admin/manage")}>
        <Resource name={"users"} list={UserList} edit={UserEdit}/>
    </Admin>
}

export default DashBoard;