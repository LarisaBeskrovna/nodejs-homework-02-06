const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const handleRunValidateAndUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
module.exports = { handleSaveError, handleRunValidateAndUpdate };