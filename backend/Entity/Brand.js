const {validateFields} = require('./Validator');
const {ServerError} = require('./ServerError');

class Brand {
  constructor(method, body, params) {
    this.id = params.id;
    this.name = body.name;

    let fields = [];
    const paramField = {type: 'int', value: this.id};
    const bodyField = {type: 'alphanumeric', value: this.name};

    switch (method) {
      case process.env.CREATE:
        fields = [bodyField];
        break;
      case process.env.READ:
        fields = [paramField];
        break;
      case process.env.UPDATE:
        fields = [paramField, bodyField];
        break;
      case process.env.DELETE:
        fields = [paramField];
        break;
      default:
        throw new ServerError(`Unknown request method.`, process.env.SERVER_ERR);
    }

    validateFields(fields);
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }
}

module.exports = {
  Brand
}