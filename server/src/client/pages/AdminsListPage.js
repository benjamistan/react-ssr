import React, { Component } from 'react';   // so we can use the ordinary React library
import { connect } from 'react-redux';      // allows us to connect React components to Redux store
import { fetchAdmins } from '../actions';    // Allows us to create the fetchAdmins action

class AdminsListPage extends Component {
    componentDidMount() {                   // tries to fetch admins on client-side render
        this.props.fetchAdmins();
    }

    renderAdmins() {
        return this.props.users.map(admin => {               // maps over the returned list of admins and
            return <li key={admin.id}>{admin.name}</li>       // creates individual <li> for them
        });
    }

    render() {
        return (                                            // calls the helper function to create the list
            <div>           
                Protected list of admins:
                <ul>{this.renderAdmins()}</ul>               
            </div>
        );
    }
}

function mapStateToProps(state) {                           // puts the state returned from the reducer into Props
    return { users: state.admins };
}

function loadData(store) {                                  // manual call to fetchAdmins done as part of server-side rendering
    return store.dispatch(fetchAdmins());                    
}


export default {
    loadData,
    component: connect(mapStateToProps, { fetchAdmins })(AdminsListPage)
};