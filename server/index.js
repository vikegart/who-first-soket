const app = require("express")();
const http = require("http").Server(app);
const path = require('path');
const cors = require('cors');

const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(cors());

const routerFilesMap = {
  host: '/pages/hostPage/',
  player: '/pages/playerPage/',
  shared: '/shared/',
}

let Usercounter = 0;

const voicesArr = [];

app.get('/shared/shared.css', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.shared}shared.css`)));
});

app.get('/shared/normalize.css', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.shared}normalize.css`)));
});



app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, `../client/${routerFilesMap.player}index.html`));
});

app.get('/index.js', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.player}index.js`)));
});

app.get('/index.css', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.player}index.css`)));
});




app.get("/chto/", function(req, res) {
  res.sendFile(path.join(__dirname, `../client/${routerFilesMap.host}index.html`));
});

app.get('/chto/index.js', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.host}index.js`)));
});

io.on("connection", function(socket) {
  Usercounter = Usercounter + 1;
  io.emit("user", Usercounter);
  console.log("user is connected");
  socket.on("disconnect", function() {
    Usercounter = Usercounter - 1;
    io.emit("user", Usercounter);
    console.log("user disconnected");
  });

  socket.on("audioMessage", function(msg) {
    io.emit("audioMessage", msg);
    voicesArr.push({timeStamp: Date(), audioBlob: msg});
  });

  socket.on("recordStarted", () => {
    io.emit("playStarSound");
  })
});

http.listen(port, function() {
  console.log("listening to port:" + port);
});