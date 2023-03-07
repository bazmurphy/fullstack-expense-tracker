// this is the file we will use to connect the database
const mongoose = require("mongoose");

// whenever we make any calls to our database
// they return a PROMISE so we will use ASYNC AWAIT
const connectDB = async () => {
  try {
    // create our connection variable, which will return a promise
    //
    const databaseConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${databaseConnection.connection.host}`.cyan.underline
        .bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    // exit with failure, is 1 - the application will shut down
    process.exit(1);
  }
};

module.exports = connectDB;
