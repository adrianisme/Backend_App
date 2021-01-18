const connection = require("./database");
const validate = require("./validation");

const express = require("express");

router = express.Router();

module.exports = router;

router.get("/accounts/all", (request, response) => {
  connection.query(`select * from accounts`, (errors, results) => {
    if (errors) {
      response.status(400).send("Error ocurred while sending request");
    } else {
      response.send(results);
    }
  });
});

router.get("/accounts/id", (request, response) => {
  if (validate.is_blank(request.body.id)) {
    response.status(400).send("Error! Id is blank");
  } else {
    connection.query(
      `select * from accounts where customer_id = ${request.body.id}`,
      (errors, results) => {
        if (errors) {
          response.status(400).send("Error ocurred while sending request");
        } else {
          response.send(results);
        }
      }
    );
  }
});

router.put("/accounts/account", (request, response) => {
  if (validate.is_blank(request.body.account)) {
    response.status(400).send("Error! Account type is blank.");
  } else if (validate.is_blank(request.body.account_number)) {
    response.status(400).send("Error! Account number is blank.");
  } else {
    connection.query(
      `update accounts set account = '${request.body.account}' where account_number = '${request.body.account_number}'`,
      (errors, results) => {
        if (errors) {
          response.status(400).send(errors);
        } else {
          response.send("Account type updated successfully");
        }
      }
    );
  }
});
