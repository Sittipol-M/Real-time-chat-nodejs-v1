import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", ({ message }) => {
    socket.broadcast.emit("receive-message", { id: socket.id, message });
  });
});

const PORT = 5555;
httpServer.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT} `);
});
