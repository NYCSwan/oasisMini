const Router = require('express-promise-router')

const db = require('../db')
const router = new Router()

// export our router to be mounted by the parent application
 module.exports = router

const root = require('./root')
const api = require('./api')

module.exports = (app) => {

 app.use('/', root)
 app.use('/api',api)
 } 
