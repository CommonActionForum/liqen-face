/**
 * Set up the Liqen Face Server and start it.
 */
import 'babel-polyfill'
import express from 'express'
import path from 'path'
import http from 'http'
import core from 'liqen'
import router from './router'
import setLiqenCore from './middlewares/set-liqen-core'

// Start the Express app
// See http://expressjs.com/en/4x/api.html#express
const app = express()

// Configuration of views.
// Tell express where are the .ejs files and what kind of engine they are.
// See https://github.com/mde/ejs
app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'ejs')

// JS files
// Serve them using webpack Hot Module Replacement or
// Serve the gzipped files
if (process.env.NODE_ENV === 'development') {
  // In development, instead of serving normal JS files, serve them using
  // webpack dev and hot middleware
  // See https://github.com/webpack/webpack-dev-middleware
  // See https://github.com/glenjamin/webpack-hot-middleware
  const webpack = require('webpack')
  const webpackDev = require('webpack-dev-middleware')
  const webpackHot = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config.dev')
  const compiler = webpack(webpackConfig)
  const options = {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }

  app.use(webpackDev(compiler, options))
  app.use(webpackHot(compiler))
} else {
  // In non-development, instead of serving normal JS files, serve the
  // pre-gzipped files.
  // See https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })
}

// Configuration of routers
// - If the request is a GET /static/**.*, use the express.static middleware
// - Otherwise, use our router in the ./router file
app.use('/static', express.static('public'))
app.use('/', router)

// Set the Liqen Core in req.core
if (process.env.NODE_ENV === 'development') {
  const localCore = require('./local-liqen').default
  app.use(setLiqenCore(localCore))
} else {
  app.use(setLiqenCore(core))
}

// Start the HTTP server
const PORT = process.env.PORT || 3000
const server = http.Server(app)

server.listen(PORT, function () {
  console.log('Listening to port ', PORT)
})
