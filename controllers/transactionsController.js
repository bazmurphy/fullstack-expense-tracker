// we bring in our Model, and we can use Mongoose Methods on this like find, create, remove etc.
const Transaction = require("../models/Transaction");

// When we use this it returns a Promise, so we need ot make all our functions ASYNC AWAIT

// description: Get All Transactions
// route: GET /api/transactions
// auth: PUBLIC
exports.getTransactions = async (request, response, next) => {
  // response.send("GET transactions");
  try {
    const transactions = await Transaction.find();

    return response.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    // console.log(error);
    return response.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// description: Add Transaction
// route: POST /api/transactions
// auth: PUBLIC
exports.addTransaction = async (request, response, next) => {
  // response.send("POST transaction");
  // whenever we are dealing with data from the client it will come in the form of request.body
  // so we need to use the bodyParser middleware which we can require in server.js
  try {
    // we destructure the information we want from the body
    const { text, amount } = request.body;

    // we use the Mongoose Create method
    const transaction = await Transaction.create(request.body);

    // HTTP 201 Created success status
    return response.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    // console.log(error);
    // this will hang if the POST Request does not include the REQUIRED key/value pairs (text, amount)
    // so we need to make a check if the Error is a ValidationError,
    // we pull out the messages we setup earlier, and send them back with the 400 Response
    if (error.name === "ValidationError") {
      // this takes all the messages from the Error Object into an Array
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );

      // HTTP Client Error (the client didn't send what it was supposed to)
      return response.status(400).json({ success: false, error: messages });
    } else {
      return response.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// description: Delete Transaction
// route: DELETE /api/transactions
// auth: PUBLIC
exports.deleteTransaction = async (request, response, next) => {
  // response.send("DELETE transaction");
  try {
    // we get the id from the parameters and try to find that transaction in the Database
    const transaction = await Transaction.findById(request.params.id);
    console.log(transaction);

    // if there isnt one found
    if (!transaction) {
      response.status(404).json({
        success: false,
        error: "No transaction with that ID found",
      });
    }
    // some methods are called on the actual Model (Transaction), some are called on the resource (transaction)
    // we remove that document from the collection
    await transaction.deleteOne();

    // when it is successfully removed, we return a response status
    return response.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
