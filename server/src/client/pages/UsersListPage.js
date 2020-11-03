import React, { Component } from 'react';   // so we can use the ordinary React library
import { connect } from 'react-redux';      // allows us to connect React components to Redux store
import { fetchUsers } from '../actions';    // Allows us to create the fetchUsers action
import { Helmet } from 'react-helmet';

class UsersList extends Component {
    componentDidMount() {                   // tries to fetch users on client-side render
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {               // maps over the returned list of users and
            return <li key={user.id}>{user.name}</li>       // creates individual <li> for them
        });
    }

    head() {
        return (
                <Helmet>
                    <title>{`${this.props.users.length} Users Loaded`}</title>
                    <meta property="og:title" content="Users App"></meta>
                </Helmet>
        );
    }

    render() {
        return (                                            // calls the helper function to create the list
            <div>
                {this.head()}          
                Here's a big list of users:
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {                           // puts the state returned from the reducer into Props
    return { users: state.users };
}

function loadData(store) {                                  // manual call to fetchUsers done as part of server-side rendering
    return store.dispatch(fetchUsers());                    
}


export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList)
};