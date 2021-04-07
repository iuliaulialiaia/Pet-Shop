const {query} = require('.');

async function getAll() {
  const sql_query = 'SELECT * FROM brand';
  return await query(sql_query);
}

async function getById(id) {
  const sql_query = 'SELECT * FROM brand WHERE id = $1';
  return await query(sql_query, [id]);
}

async function add(name) {
  const sql_query = 'INSERT INTO brand (name) VALUES ($1)';
  await query(sql_query, [name]);
}

async function updateById(id, name) {
  const sql_query = 'UPDATE brand SET name = $1 WHERE id = $2';
  await query(sql_query, [name, id]);
}

async function deleteById(id) {
  const sql_query = 'DELETE FROM brand WHERE id = $1';
  await query(sql_query, [id]);
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}