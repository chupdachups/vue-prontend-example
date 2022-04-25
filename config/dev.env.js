'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ACCOUNT_API_BASE_URL: '"http://localhost:8070/"',
  PRODUCT_API_BASE_URL: '"http://localhost:8071/"',
  RESERVE_API_BASE_URL: '"http://localhost:8072/"'
})
