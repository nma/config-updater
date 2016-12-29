const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const compress = require('compression')
const ShareDB = require('sharedb')

const app = express()
const paths = config.utils_paths

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// Apply gzip compression
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

// var mongo_path = 'mongodb://localhost:27017/test'
// const db = require('sharedb-mongo')(mongo_path);
// const backend = new ShareDB({db});

function startSocketsServer (port) {
  var http = require('http')
  var server = http.createServer(app)

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({ server: server })
  wss.on('connection', function (ws, req) {
    var stream = new WebSocketJSONStream(ws)
    backend.listen(stream)
  })

  server.listen(port)
}

function startDoc (port) {
  var WebSocket = require('ws')
  var WebSocketJSONStream = require('websocket-json-stream')

  const backend = new ShareDB()
  var connection = backend.connect()
  var doc = connection.get('config', 'host')
  doc.fetch(function (err) {
    if (err) throw err
    if (doc.type === null) {
      doc.create({ numClicks: 0 }, callback)
      return
    }
    startSocketsServer(port)
  })
}

module.exports = app
