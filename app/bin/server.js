const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const ini = require('ini')
const fs = require('fs')
const ShareDB = require('sharedb')
var http = require('http')
const port = config.server_port

var WebSocket = require('ws')
var WebSocketJSONStream = require('websocket-json-stream')
var mongo_path = 'mongodb://localhost:27017/cfgs'
const db = require('sharedb-mongo')(mongo_path)
const backend = new ShareDB({ db })

startDoc(startSocketsServer)

function startSocketsServer () {
  // var expressWs = require('express-ws')(server)
  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({ server: server })
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

  server.listen(port)

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
