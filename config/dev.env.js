'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ACCOUNT_API_BASE_URL: '"http://account-service.msa-service.svc.cluster.local:8070/"',
  PRODUCT_API_BASE_URL: '"http://product-service.msa-service.svc.cluster.local:8071/"',
  RESERVE_API_BASE_URL: '"http://reserve-service.msa-service.svc.cluster.local:8072/"'
})
