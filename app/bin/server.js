const config = require('../config')
// const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const ShareDB = require('sharedb')
var http = require('http')
const port = config.server_port

var http = require('http')
var express = require('express')
var WebSocket = require('ws')
var _ = require('lodash')
var WebSocketJSONStream = require('websocket-json-stream')
var mongo_path = 'mongodb://localhost:27017/cfgs'
const db = require('sharedb-mongo')(mongo_path)
const backend = new ShareDB({ db })

const ini = require('ini')
const fs = require('fs')

startDoc(startSocketsServer)

function startSocketsServer () {
  app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.get('/config', function (req, res, next) {
    console.log('GETTING CONFIG')
    var config = fs.readFile('./public/test.cfg', 'utf-8', (err, data) => {
      if (err) throw err
      res.send(data)
    })
  })

  app.put('/config', function (req, res, next) {
    console.log('Updating Config')
    console.log(req.body)

    if (!_.isNil(req.body) && _.hasIn(req.body, 'textBody')) {
      console.log('trying to write to config file')
      fs.writeFile('./public/test.cfg', req.body.textBody, 0, 'utf-8', (err, written, string) => {
        if (err) throw err
        res.sendStatus(200)
      });
    } else {
      res.sendStatus(400)
    }
  });

  app.get('/', function (req, res, next) {
    scripts = `
          <script src="http://localhost:8888/webpack-dev-server.js"></script>
          <script src="http://localhost:8888/vendor.js"></script>
          <script src="http://localhost:8888/app.js"></script>
        `
    var html = `
            <!doctype html>
            <html lang="en">
            <head>
              <title>React Redux Starter Kit</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
            </head>
            <body>
              <div id="root" style="height: 100%"></div>
              ${scripts}
            </body>
            </html>
        `
    res.send(html)
  })

  var socketServer = http.createServer(app)
  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({ server: socketServer })
  wss.on('connection', function (ws, req) {
    console.log('got a socket connection')
    var stream = new WebSocketJSONStream(ws)
    backend.listen(stream)
  })

  // server.ws('/', function (ws, req) {
  //   ws.on('connection', function (msg) {
  //     console.log('got a socket connection', msg)
  //     var stream = new WebSocketJSONStream(ws)
  //     backend.listen(stream)
  //   })
  // })
  socketServer.listen(port)

  // server.listen(port)
  debug(`Server is now running at http://localhost:${port}.`)
}

function startDoc (callback) {
  const backend = new ShareDB()
  var connection = backend.connect()
  var doc = connection.get('config', 'localhost')
  doc.fetch(function (err) {
    if (err) throw err
    if (doc.type === null) {
      doc.create('', callback)
      return
    }
    callback()
  })
}
