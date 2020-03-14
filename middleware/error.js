const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {
    success: false,
    code: 500,
    message: "server error"
  };
  //

  console.log(err);

  //duplicate key error
  if (err.name === "MongoError") {
    error.success = false;
    error.code = 400;
    error.message = "name : duplicate key error";
  }

  //validation error
  if (err.name === "ValidationError") {
    error.success = false;
    error.code = 400;
    error.message = Object.values(err.errors)
      .map(value => value.message)
      .join(",");
  }
  // custom thron error
  if (err.name === "Error") {
    error.success = false;
    error.code = err.status;
    error.message = err.message;
  }
  // mongo object Id error
  if (err.name === "CastError") {
    error.success = false;
    error.code = 500;
    error.message = err.message;
  }

  res.status(error.code).send(error);
};

module.exports = errorHandler;
