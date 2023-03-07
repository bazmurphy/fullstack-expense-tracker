const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

// router.get("/", (request, response) => response.send("Transactions"));

// this is the default route of "api/transactions"
// we can use .route() and then chain methods to it...
// such as "get" and pass it the getTransactions function from the CONTROLLER
// which will use response.send to send whatever to the Client
router.route("/").get(getTransactions).post(addTransaction);
// we have also chained on post and to use the addTransaction function

router.route("/:id").delete(deleteTransaction);
// the delete route needs an ID of which transaction to delete so it needs to be its own route

module.exports = router;
