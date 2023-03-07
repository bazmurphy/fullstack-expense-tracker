// we are on the back-end now using the commonJS module syntax

// bring in the path module from Node to manipulate path names
const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
// for colors in the console
const colors = require("colors");
// for logging
const morgan = require("morgan");
// for connecting to MongoDB
const connectDB = require("./config/db");

// define where the .env is kept
dotenv.config({ path: "./config/config.env" });

// we call the function imported above to connect
connectDB();

const transactions = require("./routes/transactionsRoute");

const app = express();

// this will allow us to use the bodyParser for dealing with POST requests and the request.body contents
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.get("/", (request, response, next) => {
//   response.send("Hello, the API Route is /api/transactions");
// });

app.use("/api/transactions", transactions);

// when we are in production, the client/dist folder is our static folder
// and when we make a request to anything except our api routes it will load the index.html
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (request, response) =>
    response.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
