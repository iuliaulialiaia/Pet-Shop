const {validateFields} = require('./Validator');
const {ServerError} = require('./ServerError');

const categoryNames = ['food', 'toy', 'other'];
const categoryTargets = ['cat', 'dog'];

class Category {
  constructor(method, body, params) {
    this.id = params.id;
    this.name = body.name;
    this.target = body.target;

    let fields = [];
    const paramField = {type: 'int', value: this.id};
    const bodyField = [
      {type: 'categoryName', value: this.name},
      {type: 'categoryTarget', value: this.target}
    ];

    switch (method) {
      case process.env.CREATE:
        fields = [...bodyField];
        break;
      case process.env.READ:
        fields = [paramField];
        break;
      case process.env.UPDATE:
        fields = [paramField, ...bodyField];
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
    return categoryNames.indexOf(this.name);
  }

  get getTarget() {
    return categoryTargets.indexOf(this.target);
  }
}

module.exports = {
  Category
}