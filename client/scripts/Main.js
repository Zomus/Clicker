//Load the game only when window has loaded

//*IMPORTS*
import {hexToFillStyle} from './controllers/ColorController.js';
import {drawCircle} from './controllers/DrawController.js';
import './Territory.js';

//*IMPORTS*



//*CONSTANTS*


//socket.io
var socket = io();

socket.on('echoed', function(data){
  console.log("ECHOED:");
  console.log(data);
});

socket.on('receive territory', function(data){
  var territory = Territory(data.x, data.y, data.radius, data.shrinkRate, data.color);
  gameContainer.push(territory);
})


//Define dimensions of canvas
export const CANVAS_WIDTH = 1250;
export const CANVAS_HEIGHT = 700;

//Define frame rate
const FPS = 30;

//Define background color of canvas
const BG_COLOR = 0xff0000;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");

export var canvas = canvasElement.get(0);

export var ctx = canvas.getContext("2d");

var enterFrame = new Event('ENTER_FRAME');

export var mouseX = -1;
export var mouseY = -1;

//*CONSTANTS*



//*IN GAME GLOBAL VARIABLES*

var gameContainer = [];

//*IN GAME GLOBAL VARIABLES*


//*IN GAME GLOBAL FUNCTIONS*
function clearCanvas(){
  //ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //clear everything from canvas

  ctx.fillStyle = hexToFillStyle(BG_COLOR);
  //set fillstyle to background color

  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //overwrite with background color
}

function bindKeys(){
  $(document).bind("keydown")
}


//*IN GAME GLOBAL FUNCTIONS*

window.onload = function() {

  console.log("Starting Program...");

  socket.emit('print', {
    message:'Starting Program...'
  });

  $('body').append(canvasElement);

  //Setup Project here
  bindKeys();


  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  }, false);

  canvas.addEventListener('click', function(evt){
    socket.emit('create territory', {
      x: mouseX,
      y: mouseY,
      radius: 40,
      shrinkRate: 1,
      color: 0x0000ff
    })
  });


  setInterval(function(){
    clearCanvas();
    //clear canvas every frame

    eFrame(gameContainer)
    //(recursively) runs enterframe functions for each symbol

    drawFrame(gameContainer);
    //(recursively) draw all objects inside gameContainer

  }, 1000/FPS);
  //Update and draw canvas every 1/FPSth of a second

}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



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
