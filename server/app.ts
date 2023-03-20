import { Server } from "socket.io";

const io = new Server(1000, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    socket.on("join-room", ({ name, room }) => {
        console.log(`${name} joined`)
    })
    socket.on("disconnect-room", ({ name, room }) => {
        console.log(`${name} joined`)
    })
    socket.on("send-message", ({ message }) => {
        console.log(message)
    })
})

