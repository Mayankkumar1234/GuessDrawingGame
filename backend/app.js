const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser ,getUsersInRoom} = require("./utils/user.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Our MERN Stack project");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit all the users in the room
  // socket.emit("userName", userList);
  // Emit the user with the joined users
  socket.on("user-joined", (data) => { 
    console.log(data)
    // Joined the user in the room
    const { name, userId, roomId, role } = data;
    socket.join(roomId)
   const user =  addUser({name , userId, roomId , role})
 
      socket.emit("userIsJoined", { success: true, user });
  });

  // console.log(userList);

  socket.on("getUsers", (roomId)=>{
      const users = getUsersInRoom(roomId)
  })

  // Broadcast the message to the user based on thier name...
  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    socket.to(room).emit("receve-message", message);
  });

  socket.on("join-room", (roomId) => {
    console.log("User has join the room :", roomId);
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
