const req = require('express/lib/request')

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  username: 'charlesclark',
  database: 'ecommerce',
})


//User commands:

//displays all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json(results.rows)
  })
}
//displays single user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}
//creates new user

// const createUser = (request, response) => {
//   const { username, password, first_name, last_name, email } = request.body
//   console.log(request.body)
//   pool.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)',
//   [username, password, first_name, last_name, email ], (error, results) => {
//     if (error) {
//       throw error
//     }
//       response.status(201).send('user created' + first_name + '  ' + last_name)
//   })
// }

//updates existing user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, password, first_name, last_name, email } = request.body
  pool.query( 'UPDATE users SET modified_at = NOW(), username = $1, password = $2, first_name = $3, last_name = $4, email = $5 WHERE id = $6',
  [username, password, first_name, last_name, email, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`User modified with ID: ${id}`)
  })
}
//deletes user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`User deleted with ID: ${id}`)
  })
}

//Product commands:

//displays all products
const getProducts = (request, response) => {
  pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
     response.status(200).json(results.rows)
  })
}

//displays products by type

const getProductByCategory = (request, response) => {
  const category_id = parseInt(request.params.category_id)
  pool.query('SELECT * FROM product WHERE category_id = $1', [category_id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}

//displays single product

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM product WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
  })
}
//creates new product
const createProduct = (request, response) => {
  const { name, description, sku, price } = request.body
  pool.query('INSERT INTO product (name, description, sku, price) VALUES ($1, $2, $3, $4)',
  [name, description, sku, price], (error, results) => {
    if (error) {
      throw error
    }
      response.status(201).send(`Product added with ID: ${results.id}`)
  })
}
//updates existing product
const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, description, sku, price } = request.body
  pool.query( 'UPDATE product SET name = $1, description = $2, sku = $3, price = $4 WHERE id = $5',
  [name, description, sku, price, id],
  (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Product modified with ID: ${id}`)
  })
}
//deletes product
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM product WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send(`Product deleted with ID: ${id}`)
  })
}

module.exports = {
  pool,
  getUsers,
  getUserById,
  //createUser,
  updateUser,
  deleteUser,
  getProducts,
  getProductByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}