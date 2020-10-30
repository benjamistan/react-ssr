import express from 'express';
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public')); // Express to make 'public' directory available to outside world
app.get('/', (req, res) => { res.send(renderer()); });

app.listen(3000, ()=> {
    console.log('Listening on port 3000');
});