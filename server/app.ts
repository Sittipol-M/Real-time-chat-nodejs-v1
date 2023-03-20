import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log("user connect")
    console.log(socket.id);
    socket.emit("socket-name", "message-emit")
    socket.on("new-user", (message) => {
        console.log(message)
    })
})