//import - express
const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
})

app.use('/client', express.static(__dirname + '/client'));

//import - http
const serv = require('http').Server(app);
const PORT = 2000;

serv.listen(PORT, function(){
  console.log("Listening on port " + PORT)
});

//import - jQuery
const $ = require('jQuery');



//imports - custom
var Territory = require('./server/Territory');


//import - canvas
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(200, 200);

//Define dimensions of canvas
const CANVAS_WIDTH = 1250;
const CANVAS_HEIGHT = 700;
const FPS = 30;

var ctx = canvas.getContext("2d");
//create a virtual canvas inside the server using canvas import (used to compute territory bonus)

var territories = [];
//array that contains territories in drawn in the server

setInterval(function(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //clear canvas every frame

  eFrame(territories);
  //(recursively) runs enterframe functions for each symbol

  drawFrame(territories);
  //(recursively) draw all objects inside gameContainer

  //emit message to update territory bonus granted to each player
  io.emit('update territory bonus', {
    bonus:'replace this with a call to a function that returns territory bonuses'
  });

}, 1000/FPS);
//Update and draw canvas every 1/FPSth of a second


function eFrame(container){
  /*
  PARAMETERS:
  container:Array = array that contains objects (or other containers) to be drawn on the canvas
  DO:
  Runs enterframe functions for every object.
  RETURN VALUE:
  Number of objects removed in this frame
  */

  var removed = 0;
  //counts number of objects removed

  container.forEach(function(symbol){

    var tbDestroyed = [];

    if(symbol instanceof Array){
      //another container

      eFrame(symbol);
      //perform recursive call to draw the container in order

    }else{
      //object

      if(symbol.eFrame != undefined && symbol.eFrame instanceof Function){
        //symbol has a property called "draw" and is of type Function

        if(!symbol.eFrame()){//call the draw function to draw it
          //if false, then eFrame requires the object to be removed
          tbDestroyed.push(symbol);
        }

      }
    }

    //Remove symbols to be destroyed from the container after loop is complete
    tbDestroyed.forEach(function(symbol){
      container.splice(container.indexOf(symbol), 1);
      removed++;
    });
  });

  return removed;
}


function drawFrame(container){
  /*
  PARAMETERS:
  container:Array = array that contains objects (or other containers) to be drawn on the canvas
  DO:
  Draws all objects in the container onto the screen
  RETURN VALUE:
  undefined
  */

  container.forEach(function(symbol){

    if(symbol instanceof Array){
      //another container

      drawFrame(symbol);
      //perform recursive call to draw the container in order

    }else{
      //object
      if(symbol.draw != undefined && symbol.draw instanceof Function){
        //symbol has a property called "draw" and is of type Function

        symbol.draw(ctx);
        //call the draw function to draw it
      }
    }
  });
}




//server.io
var io = require('socket.io')(serv, {});

io.sockets.on('connection', function(socket){
  console.log("user connected")

  io.emit('BROADCAST: User connected!');
  socket.emit('You have connected!');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('print', function(data){
    console.log('PRINT:' + data.message);
  });

  socket.on('echo', function(data){
    socket.emit('echoed', data);
  });

  socket.on('create territory', function(data){
    var territory = Territory.init(data.x, data.y, data.radius, data.shrinkRate, data.color);

    territories.push(territory);

    io.emit('receive territory', {
      x: data.x,
      y: data.y,
      radius: data.radius,
      shrinkRate: data.shrinkRate,
      color: data.color
    });
  });


})
