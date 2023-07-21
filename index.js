



const express = require('express');
const app =express();
const PORT=process.env.PORT || 4000
const server=app.listen(PORT,()=>
console.log(`chat serve port is ${PORT}`))
const path = require('path');


const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public'))) 


//Setting up Socket.IO


let socketsConected = new Set()

io.on('connection',onConnected)

function onConnected(socket) {
 // console.log('Socket connected', socket.id)

  socketsConected.add(socket.id)
  
  


   
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    //console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id);
    io.emit('clients-total', socketsConected.size);
  })

   

 





  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}