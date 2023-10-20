// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routerUrls = require("./controllers/routes");
const setRateLimit = require("express-rate-limit");

// Create a new express application named 'app'
const app = express();

// Configure the CORs middleware
app.use(
  cors({
    origin: "https://homeinventory-kzh9.onrender.com",
    credentials: true,
  })
);

//limit requests
keyGenerator = (request, _response) => {
  let ip = request.headers['x-forwarded-for'];
  if (!ip) {
    console.log("current ip ", ip);
    console.error("Warning: request.ip is missing!");
    return req.socket.remoteAddress;
  }

  console.log("Key generator running.");

  return request.ip.replace(/:\d+[^:]*$/, "");
};

keyGenerator();

const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "You have exceeded your 50 requests per minute limit.",
  headers: true,
});
app.set('trust proxy', 1);
app.use(rateLimitMiddleware);

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
