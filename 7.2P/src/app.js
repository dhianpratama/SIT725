const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const bodyParser = require("body-parser");
const config = require("./config/config.js");
const todoRoutes = require("./routes/todo.routes.js");

const http = require('http');
const { Server } = require("socket.io");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

console.log('DB URL: ', config.dbUrl)
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (err) {
  console.log(`Could not connect to the database: ${err}`);
  process.exit();
});

mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Serve static files from public folder
// such as index.html and images
app.use(express.static('public'))

// Todo Routes
app.use("/api/todos", todoRoutes);

// Client path routes
const publicPath = __dirname + '/../public';
app.get('/new-todo', (_, res) => res.sendFile(path.resolve(publicPath + '/todo-form.html')) )
app.get('/todos/:id', (_, res) => res.sendFile(path.resolve(publicPath + '/todo-form.html')) )
app.get('/', (_, res) => res.sendFile(path.resolve(publicPath + '/index.html')) )

const PORT = config.port;
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);
  
});
    

server.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app; // Export the app for testing