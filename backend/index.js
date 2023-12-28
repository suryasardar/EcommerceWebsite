//start


const cors = require("cors");
const express = require("express");
// require("dotenv").config();
const dotenv = require('dotenv');
const app = express();
dotenv.config();
// console.log(totalCPUS);
const PORT=process.env.APP_PORT|| 4000

// Middleware for parsing request bodies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const userrouter = require("./useRouter");
app.use("/apis", userrouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is listening at http://localhost:",PORT);
});

module.exports = app;