const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then( () => {
    console.log('successfully connected to DB');
}).catch( err => {
    console.log('could not connect to DB, Exiting now');
    process.exit();
});

app.get('/api', function(req, res) {
    console.log('API works');
});

var UserController = require('./app/controllers/user.controller');
app.use('/user', UserController);

const server = app.listen(port, function() {
    console.log(`Server running on port ${port}`);
})
