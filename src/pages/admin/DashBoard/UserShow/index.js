import React, {Component} from 'react';
import {Show, SimpleShowLayout, TextField, DateField} from 'react-admin'

const UserShow = (props) => {
   return <Show title={"User detail"} {...props}>
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
       </SimpleShowLayout>
   </Show>
}

export default UserShow;
