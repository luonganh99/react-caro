import React from 'react';
import {
    Datagrid,
    DateField,
    ReferenceManyField,
    Show,
    Tab,
    TabbedShowLayout,
    TextField,
} from 'react-admin';
import PostShowActions from './UserShowActions';

const UserShow = (props) => {
    console.log('Usershow: ', props);
    return (
        <Show title={'User detail'} {...props} actions={<PostShowActions />}>
            <TabbedShowLayout>
                <Tab label="User profile">
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
                </Tab>
                <Tab label="History" path="boards">
                    <ReferenceManyField reference="boards" target="userId" addLabel={false}>
                        <Datagrid rowClick={'show'}>
                            <TextField source={'boardId'} />
                            <TextField source={'hostname'} />
                            <TextField source={'guestname'} />
                            <TextField source={'winner'} />
                            <DateField source={'createdAt'} />
                            <DateField source={'finishedAt'} />
                            <TextField source={'cups'} />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};

export default UserShow;
