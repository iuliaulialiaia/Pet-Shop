const {query} = require('.');

async function getAll() {
  const sql_query = ' \
    SELECT b.id as brand_id, b.name as brand_name, \
      c.name as category_name, c.target, \
      p.id as product_id, p.name as product_name, p.price, p.quantity, p.description, p.comments, p.rating \
    FROM brand b, category c, product p \
    WHERE p.brand_id = b.id \
    AND p.category_id = c.id \
  ';
  return await query(sql_query);
}

async function getById(id) {
  const sql_query = ' \
    SELECT b.id as brand_id, b.name as brand_name, \
      c.name as category_name, c.target, \
      p.id as product_id, p.name as product_name, p.price, p.quantity, p.description, p.comments, p.rating \
    FROM brand b, category c, product p \
    WHERE p.brand_id = b.id \
    AND p.category_id = c.id \
    AND p.id = $1 \
  ';
  return await query(sql_query, [id]);
}

async function add(name, price, quantity, description, comments, rating, brand_id, category_id) {
  const sql_query = ' \
    INSERT INTO \
    product (name, price, quantity, description, comments, rating, brand_id, category_id) \
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) \
  ';
  await query(sql_query, [name, price, quantity, description, comments, rating, brand_id, category_id]);
}

async function updateById(id, name, price, quantity, description, comments, rating, brand_id, category_id) {
  const sql_query = 'UPDATE product \
    SET name = $1, \
      price = $2, \
      quantity = $3, \
      description = $4, \
      comments = $5, \
      rating = $6, \
      brand_id = $7, \
      category_id = $8 \
    WHERE id = $9 \
  ';
  await query(sql_query, [name, price, quantity, description, comments, rating, brand_id, category_id, id]);
}

async function deleteById(id) {
  const sql_query = 'DELETE FROM product WHERE id = $1';
  await query(sql_query, [id]);
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}