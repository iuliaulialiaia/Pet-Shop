const {query} = require('.');

async function getAll() {
  const sql_query = 'SELECT * FROM category';
  return await query(sql_query);
}

async function getById(id) {
  const sql_query = 'SELECT * FROM category WHERE id = $1';
  return await query(sql_query, [id]);
}

async function add(name, target) {
  const sql_query = 'INSERT INTO category (name, target) VALUES ($1, $2)';
  await query(sql_query, [name.toLowerCase(), target.toLowerCase()]);
}

async function updateById(id, name, target) {
  const sql_query = 'UPDATE category SET name = $1, target = $2 WHERE id = $3';
  await query(sql_query, [name.toLowerCase(), target.toLowerCase(), id]);
}

async function deleteById(id) {
  const sql_query = 'DELETE FROM category WHERE id = $1';
  await query(sql_query, [id]);
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}