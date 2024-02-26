const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type IBingoSquare = { selectedColors: string[]; text: string; user: string }

io.on('connection', socket => {
  console.log('connection')
  socket.on('cell-click', ({ selectedColors, text, user }: IBingoSquare) => {
    socket.broadcast.emit('cell-click', { selectedColors, text, user })
    console.log(selectedColors, text, user, 'index.tx cell-click')
  })
})

server.listen(3001, () => {
  console.log('Server listening on post 3001')
})
