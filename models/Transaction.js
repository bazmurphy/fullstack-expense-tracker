const mongoose = require("mongoose");

// When we make a POST Request and send Data, it will only accept text and amount (nothing else)
const TransactionSchema = new mongoose.Schema({
  // the _id will be created automatically by MongoDB
  text: {
    type: String,
    trim: true,
    // this can be just true, but we can add an array so we can output the message with our response
    required: [true, "For Description: Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "For Amount: Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// we now can export this as a Mongoose Model/Schema
module.exports = mongoose.model("Transaction", TransactionSchema);
