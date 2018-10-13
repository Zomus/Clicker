//express
var express = require('express');
var app = express();
var serv = require('http').Server(app);

const PORT = 2000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
})

app.use('/client', express.static(__dirname + '/client'));

serv.listen(PORT, function(){
  console.log("Listening on port " + PORT)
});


//server.io
var io = require('socket.io')(serv, {});


//handles connection
io.sockets.on('connection', function(socket){
  console.log("user connected")

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //socket.on('')
})

io.on('connection', function(socket)
{
  socket.on('drawNewTerritory', function(x, y, player)
  {
    
  });
}
);
