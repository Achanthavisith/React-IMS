// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routerUrls = require("./controllers/routes");

//config dotenv to access .env with DB address
dotenv.config();

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 8000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Configure the CORs middleware
var allowedOrigins = ["https://homeinventory-kzh9.onrender.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());

//connect to DB
mongoose.connect(process.env.URI);
//display message when connected
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
});
// Require Route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to from server." });
});

app.use("/api", routerUrls);

console.log("REACT_APP_ENVIRONMENT => ", process.env.NODE_ENV);

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
