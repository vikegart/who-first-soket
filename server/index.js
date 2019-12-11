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
app.get('/chto/index.css', function(req, res) {
  res.sendFile((path.join(__dirname, `../client/${routerFilesMap.host}index.css`)));
});

io.on("connection", function(socket) {
  console.log("user is connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("ready", function(ready) {
    io.emit("ready", ready);
  });

  socket.on("answer", function(teamName) {
    io.emit("answer", teamName);
  });

});

http.listen(port, function() {
  console.log("listening to port:" + port);
});