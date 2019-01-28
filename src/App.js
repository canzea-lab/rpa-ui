import React from 'react';
import jsonServerProvider from 'ra-data-json-server';

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { UserList } from './users';
import { PostList, PostEdit, PostCreate } from './posts';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import Dashboard from './dashboard';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => (
    <Admin authProvider={authProvider}  dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}  icon={PostIcon}/>
        <Resource name="users" list={UserList} icon={UserIcon}/>
    </Admin>
);

export default App;
