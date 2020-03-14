const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {
    success: false,
    code: 500,
    message: "server error"
  };
  //
  // console.log(error.name);

  if (err.name === "Error") {
    error.success = false;
    error.code = err.status;
    error.message = err.message;
  }
  if (err.name === "CastError") {
    error.success = false;
    error.code = 500;
    error.message = `bootcamp  id ${err.value} not valid`;
  }

  res.status(error.code).send(error);
};

module.exports = errorHandler;
