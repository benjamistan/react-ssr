import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));   // Any request for api route will go to this domain 
app.use(express.static('public')); // Express to make 'public' directory available to outside world
app.get('*', (req, res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {     // reads in all routes and triggers loadData functions
        return route.loadData ? route.loadData(store) : null;               // reading them all into an array, promises[]
    }); 

    Promise.all(promises).then(() => {                                      // Promise.all waits for all promises to be returned, then
        res.send(renderer(req, store));                                     // renders the app
    });
});

app.listen(3000, ()=> {
    console.log('Listening on port 3000');
});