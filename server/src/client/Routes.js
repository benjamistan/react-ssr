import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList';


export default () => {
    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Home} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/auth/google" component={Home} />
            <Route exact path="/current_user" component={Home} />
            <Route exact path="/logout" component={Home} />
        </div>
    );
};