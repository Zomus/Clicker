//Load the game only when window has loaded

//*IMPORTS*

import './Tank.js';
import {hexToFillStyle} from './plugins/ColorController.js';


//*IMPORTS*



//*CONSTANTS*

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

export var gameContainer = [];
export var bulletContainer = [];

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

  console.log("Loading Tanks Arena...");

  $('body').append(canvasElement);

  //Setup Project here
  bindKeys();

  var tank = Tank(
    200,        //x
    240,        //y
    50,         //scale
    0,          //rotation
    0x00ff00,   //color
    1           //speed
  );

  gameContainer.push(tank);
  gameContainer.push(bulletContainer);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  }, false);


  setInterval(function(){
    clearCanvas();
    //clear canvas every frame

    document.dispatchEvent(enterFrame);
    //dispatch an enterframe function to cause all objects to update by 1 frame

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
