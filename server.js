// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const routerUrls = require('./controllers/routes')

//config dotenv to access .env with DB address
dotenv.config();

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());
app.use(express.json());

//connect to DB
mongoose.connect(process.env.URI)
//display message when connected
const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
});
// Require Route
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to from server." });
});

app.use('/api', routerUrls);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use('/', express.static(path.join(__dirname, '/client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.use('/', express.static(path.join(__dirname, '/client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

console.log('REACT_APP_ENVIRONMENT => ', process.env.NODE_ENV);


// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
