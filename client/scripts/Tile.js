//*IMPORTS*
import {setFillStyle} from './plugins/DrawController.js';
import {setLineStyle} from './plugins/DrawController.js';

//*IMPORTS*

//*CLASS CONSTANTS*
const COLOR = 0x00ff00;

//const SPRITE = Sprite('bullet');
const OFFSET_X = 82;
const OFFSET_Y = 82;



//**
//ENCLOSURE
(function() {
  function Tile(x, y, size){

    //Assign Default Properties
    x = x || 0;
    y = y || 0;
    size = size || 0;

    return {
      x: x,
      y: y,
      size: size,

      draw: function(ctx){
        setFillStyle(ctx, 0);
        setLineStyle(ctx, 2, 0x999999)
        ctx.rect(x, y, size, size);
        ctx.fill();
      },
      inside: function(xPos, yPos){
        /*
        RETURN VALUE:
        true = (xPos, yPos) is inside tile
        false = (xPos, yPos) is not inside tile
        */
        if(xPos < x || xPos > x + size || yPos < y || yPos > yPos + size){
          return false;
        }
        else{
          return true;
        }
      }

    }
  }

  window.Tile = function(x, y, size){
    var tile = Tile(x, y, size);

    return tile;
  }

//ENCLOSURE
}());
