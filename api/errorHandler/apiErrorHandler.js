const errors = require("./apiErrors");

function errorHandler(err, req, res) {
  if (err instanceof errors) {
    res.status(err.status).json({
      err: err.message,
    });
    return;
  }
  res.status(500).json({
    err: "Something went wrong",
  });
}

module.exports = errorHandler;
