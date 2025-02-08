import { Server } from "socket.io"

const socketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
      } else {

        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            path: "/api/websocket", // Custom path to avoid conflicts
        });

        io.on('connection', socket => {
            socket.on('input-change', msg => {
              socket.broadcast.emit('update-input', msg)
              console.log("text: ", msg);
            })
          })
        res.socket.server.io = io
      }
      res.end()
      
}

export default socketHandler;