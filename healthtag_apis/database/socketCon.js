exports.socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("setup", (userData) => {
      socket.join(userData.id);
      console.log(userData.id);
      socket.emit("connected",);
    })

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("room join by user", room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"))
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if (!chat.chat_users) return console.log("no users in chat");
      chat.chat_users.forEach((user) => {
        if (user.userId === newMessageRecieved.senderUser.id) return;
        console.log(user.userId)
        socket.in(user.userId).emit("message recieved", newMessageRecieved);
      })
    })
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData.id);
    });
  });
}