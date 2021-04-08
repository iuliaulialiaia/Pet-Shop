class ServerError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = httpStatus;
    Error.captureStackTrace(this, this.constructor);
  }

  get getStatusCode() {
    return this.statusCode;
  }

  get getMessage() {
    return this.message;
  }
}

module.exports = {
  ServerError
};