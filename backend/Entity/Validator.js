const validator = require('validator');
const {ServerError} = require('./ServerError');

const user_error = parseInt(process.env.USER_ERR);

/**
 * @param {Object[]} fields
 * @param {int|string} Object[].value - valoarea pe care o verific
 * @param {string} Object[].type - tipul pe care trebuie sa il aiba valoarea
 * @throws {ServerError} - daca `fields` sunt invalide
 */
function validateFields(fields) {
  for (let fieldName in fields) {
    const fieldValue = fields[fieldName].value + '';
    const fieldType = fields[fieldName].type;

    if (!fieldValue) {
      throw new ServerError(`The field ${fieldName} is empty.`, user_error);
    }

    switch(fieldType) {
      case 'alphanumeric':
        if(!validator.isAlphanumeric(fieldValue)) {
          throw new ServerError(`The field ${fieldValue} is not alphanumeric.`, user_error);
        }
        break;
      case 'int':
        const options = {min: 1};
        if(!validator.isInt(fieldValue, options)) {
          throw new ServerError(`The field ${fieldValue} is not a positive integer.`, user_error);
        }
        break;
    }
  }
}

module.exports = {
  validateFields
};