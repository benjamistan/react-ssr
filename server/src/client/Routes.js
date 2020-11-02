import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';


export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,            /// destructures component object, allowing access to loadData()
                path: '/',
                exact: true,
            },
            {
                ...UsersListPage,
                path: '/users',
            }
        ]
    }
];


