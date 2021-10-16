const HandledError = require('../error/handledError');

const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (error instanceof HandledError) {
        const status = error.status;
        return res.status(status).send({
          code: status,
          errors: [
            {
              error_code: status,
              title: error.message || "OOPS! Something went wrong.",
            },
          ],
        });
      } 
      else {
        // throwing unhandled error
        return next(error);
      }
    });
  };
};

module.exports = {
  asyncWrapper
}