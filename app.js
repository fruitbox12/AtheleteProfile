const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const atheletes = require('./routes/route_handlers');
const connect = require('connect');

// database connection
mongoose.connect(config.database, {useNewUrlParser : true});
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
	console.log('Connected to the database : '+config.database);
});
mongoose.connection.on('error', (err) => {
	console.log('Error '+err);
});


const app = express();
const port = 3000;

/*middlewares*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use('/atheletes', atheletes);


//app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
	res.send('Currently unavailable');
});

app.listen(port, () => {
	console.log('server started on '+port);
});
