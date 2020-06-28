const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const app = express();
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3030;
const io = require('socket.io')(http);

const db = require("./config").mongoURI;

const userRoutes = require("./routes/acccount");
const mainRoutes = require("./routes/main");
const sellerRoutes = require("./routes/seller");
const productSearchRoutes = require("./routes/product-search");
const answerRoutes = require("./routes/answer");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", productSearchRoutes);
app.use("/api/answer", answerRoutes);

// Express will serve up production assets like our main.js/css file
app.use(express.static(__dirname + "/client/dist/AngularAmazono"));

// Epxress will serve up index.html file if don't file the route
const path = require("path");

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'client', 'dist', 'angular-amazono' ,'index.html'));
  res.sendFile(path.join(__dirname + "/client/dist/AngularAmazono/index.html"));
});


io.on('connection', (socket) => {
  let roomIds = [];
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })

  socket.on('chat-message', (message) => {
    console.log(message);
    socket.broadcast.emit('chat-message', message);
  })

  // create new room with id of conversation
  socket.on('create-room', (roomId) => {
    if (!roomIds.includes(roomId)) {
      console.log(`room with id: ${roomId} has been created`)
      socket.join(roomId);
      roomIds.push(roomId);
      console.log(roomIds);
    }
  })

  socket.on('admin-chat', message => {
    console.log(message);
    socket.broadcast.to(message.roomId).emit('admin-chat', {from: message.roomId, content: message.content});
    // leave room when admin end the conversation
    if (message.content.shouldEnd) {
      socket.leave(message.roomId);
      console.log(`room with id :${message.roomId} has been left`);
    }
  })
  
})

// app.listen(PORT);
http.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
})
